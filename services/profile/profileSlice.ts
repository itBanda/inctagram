import { baseQueryWithReauth } from '@/services/baseQuery'
import { ProfileRequest } from '@/services/profile/types'
import { createApi } from '@reduxjs/toolkit/query/react'

export const profileApi = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: builder => ({
    setProfileInfo: builder.mutation<{}, ProfileRequest>({
      query: body => ({ body, method: 'PUT', url: 'users/profile' }),
    }),
  }),
  reducerPath: 'profileApi',
})
