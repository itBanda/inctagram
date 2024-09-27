import { authActions } from '@/features'
import { AppState } from '@/store'
import {
  type BaseQueryApi,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query'
import { Mutex } from 'async-mutex'

const authHeaders = (headers: Headers, { getState }: Pick<BaseQueryApi, 'getState'>) => {
  const accessToken = (getState() as AppState).auth.accessToken

  if (accessToken) {
    headers.set('Authorization', `Bearer ${accessToken}`)
  }

  return headers
}

const mutex = new Mutex()

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  credentials: 'include',
  prepareHeaders: authHeaders,
})

export const baseQueryWithReauth: BaseQueryFn<
  FetchArgs | string,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock()
  let result = await baseQuery(args, api, extraOptions)

  if (result.error && result.error.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire()

      try {
        const refreshResult = (await baseQuery(
          { method: 'POST', url: 'auth/update-tokens' },
          api,
          extraOptions
        )) as { data: { accessToken: string } }

        if (refreshResult.data) {
          api.dispatch(authActions.login({ accessToken: refreshResult.data.accessToken }))
          result = await baseQuery(args, api, extraOptions)
        } else {
          api.dispatch(authActions.logout())
        }
      } finally {
        release()
      }
    } else {
      await mutex.waitForUnlock()
      result = await baseQuery(args, api, extraOptions)
    }
  }

  return result
}
