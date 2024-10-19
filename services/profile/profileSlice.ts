import { createApi } from '@reduxjs/toolkit/query/react'

import { baseQueryWithReauth } from '../baseQuery'
import { AvatarResponse, ProfileResponse } from './types'

export const profileApi = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: builder => ({
    loadAvatar: builder.mutation<AvatarResponse, { abort?: AbortSignal; formData: FormData }>({
      query: ({ abort, formData }) => {
        return {
          body: formData,
          method: 'POST',
          signal: abort,
          url: 'users/profile/avatar',
        }
      },
    }),
    profile: builder.query<ProfileResponse, void>({
      query: () => ({ url: 'users/profile' }),
    }),
  }),
  reducerPath: 'api/users',
})
