import { createApi } from '@reduxjs/toolkit/query/react'

import { baseQueryWithReauth } from './baseQuery'
import {
  AuthMeResponse,
  ConfirmRegistrationRequest,
  ResendConfirmationCodeRequest,
  SignInRequest,
  SignInResponse,
  SignUpRequest,
  UpdateTokensResponse,
} from './types'

export const authApi = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: builder => ({
    authMe: builder.query<AuthMeResponse, void>({
      query: () => ({ url: 'auth/me' }),
    }),
    confirmRegistration: builder.mutation<{}, ConfirmRegistrationRequest>({
      query: body => ({ body, method: 'POST', url: 'auth/registration-confirmation' }),
    }),
    login: builder.mutation<SignInResponse, SignInRequest>({
      query: body => ({ body, method: 'POST', url: 'auth/login' }),
    }),
    resendConfirmationCode: builder.mutation<{}, ResendConfirmationCodeRequest>({
      query: body => ({ body, method: 'POST', url: 'auth/registration-email-resending' }),
    }),
    signUp: builder.mutation<{}, SignUpRequest>({
      query: body => ({ body, method: 'POST', url: 'auth/registration' }),
    }),
    updateTokens: builder.mutation<UpdateTokensResponse, void>({
      query: () => ({ method: 'POST', url: 'auth/update-tokens' }),
    }),
  }),
  reducerPath: 'api/auth',
})
