import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { SignInRequest, SignInResponse } from './types'

// Define a service using a base URL and expected endpoints
export const authApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL }),
  endpoints: builder => ({
    login: builder.mutation<SignInResponse, SignInRequest>({
      query: body => ({ body, method: 'POST', url: 'auth/login' }),
    }),
  }),
  reducerPath: 'auth',
})
