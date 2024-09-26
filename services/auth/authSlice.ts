import { createApi } from '@reduxjs/toolkit/query/react'

import { baseQueryWithReauth } from './baseQuery'
import { AuthMeResponse, SignInRequest, SignInResponse, UpdateTokensResponse } from './types'

export const authApi = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: builder => ({
    authMe: builder.query<AuthMeResponse, void>({
      query: () => ({ url: 'auth/me' }),
    }),
    login: builder.mutation<SignInResponse, SignInRequest>({
      query: body => ({ body, method: 'POST', url: 'auth/login' }),
    }),
    updateTokens: builder.mutation<UpdateTokensResponse, void>({
      query: () => ({ method: 'POST', url: 'auth/update-tokens' }),
    }),
  }),
  reducerPath: 'api/auth',
})
