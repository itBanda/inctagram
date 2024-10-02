import { createApi } from '@reduxjs/toolkit/query/react'

import { baseQueryWithReauth } from '../baseQuery'
import {
  AuthMeResponse,
  ConfirmRegistrationRequest,
  GoogleLoginRequest,
  GoogleLoginResponse,
  ResendConfirmationCodeRequest,
  SignInRequest,
  SignInResponse,
  SignUpRequest,
  UpdatePasswordRequest,
  UpdateTokensResponse,
} from './types'

export const authApi = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: builder => ({
    authMe: builder.query<AuthMeResponse, void>({
      query: () => ({ url: 'auth/me' }),
    }),
    checkRecoveryCode: builder.mutation<{ email: string }, { recoveryCode: string }>({
      query: body => ({ body, method: 'POST', url: 'auth/check-recovery-code' }),
    }),
    confirmRegistration: builder.mutation<{}, ConfirmRegistrationRequest>({
      query: body => ({ body, method: 'POST', url: 'auth/registration-confirmation' }),
    }),
    googleLogin: builder.mutation<GoogleLoginResponse, GoogleLoginRequest>({
      query: body => ({ body, method: 'POST', url: 'auth/google/login' }),
    }),
    login: builder.mutation<SignInResponse, SignInRequest>({
      query: body => ({ body, method: 'POST', url: 'auth/login' }),
    }),
    logout: builder.mutation<{}, void>({
      query: () => ({
        method: 'POST',
        url: 'auth/logout',
      }),
    }),
    resendConfirmationCode: builder.mutation<{}, ResendConfirmationCodeRequest>({
      query: body => ({ body, method: 'POST', url: 'auth/registration-email-resending' }),
    }),
    signUp: builder.mutation<{}, SignUpRequest>({
      query: body => ({ body, method: 'POST', url: 'auth/registration' }),
    }),
    updatePassword: builder.mutation<void, UpdatePasswordRequest>({
      query: body => ({ body, method: 'POST', url: 'auth/new-password' }),
    }),
    updateTokens: builder.mutation<UpdateTokensResponse, void>({
      query: () => ({ method: 'POST', url: 'auth/update-tokens' }),
    }),
  }),
  reducerPath: 'api/auth',
})
