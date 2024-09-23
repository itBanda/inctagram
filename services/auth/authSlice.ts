import { BaseQueryApi, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { AppState } from '../../store'
import { SignInRequest, SignInResponse, SignUpRequest } from './types'

const authHeaders = (headers: Headers, { getState }: Pick<BaseQueryApi, 'getState'>) => {
  const accessToken = (getState() as AppState).auth.accessToken

  if (accessToken) {
    headers.set('Authorization', `Bearer ${accessToken}`)
  }
}

const baseQuery = () => fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL })

export const authApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    prepareHeaders: authHeaders,
  }),
  endpoints: builder => ({
    login: builder.mutation<SignInResponse, SignInRequest>({
      query: body => ({ body, method: 'POST', url: 'auth/login' }),
    }),
    signUp: builder.mutation<SignUpRequest>({
      query: body => ({ body, method: 'POST', url: 'auth/registration' }),
    }),
  }),
  reducerPath: 'api/auth',
})
