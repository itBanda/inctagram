import { baseQueryWithReauth } from '@/services/baseQuery'
import { PublicUserProfileResponse } from '@/services/public-user/types'
import { createApi } from '@reduxjs/toolkit/query/react'

export const publicUserApi = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: builder => ({
    getPublicProfileById: builder.query<PublicUserProfileResponse, { profileId: number }>({
      query: ({ profileId }) => ({
        url: `public-user/profile/${profileId}`,
      }),
    }),
  }),
  reducerPath: 'api/publicUser',
})
