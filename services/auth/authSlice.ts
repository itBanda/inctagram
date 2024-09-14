import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const authApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL }),
  endpoints: builder => ({
    login: builder.mutation<any, void>({
      query: () => 'auth/login',
    }),
  }),
  reducerPath: 'auth',
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useLoginMutation } = authApi
