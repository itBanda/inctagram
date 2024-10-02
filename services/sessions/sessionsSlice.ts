import { baseQueryWithReauth } from '@/services/baseQuery'
import { createApi } from '@reduxjs/toolkit/query/react'

export const sessionsApi = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: builder => ({
    terminateAllSessions: builder.mutation<any, void>({
      query: () => ({
        method: 'DELETE',
        url: 'sessions/terminate-all',
      }),
    }),
  }),
})
