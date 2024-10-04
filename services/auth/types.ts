export type SignInRequest = {
  email: string
  password: string
}

export type SignInResponse = {
  accessToken: string
}

export type AuthMeResponse = {
  email: string
  isBlocked: boolean
  userId: number
  userName: string
}

export type UpdateTokensResponse = SignInResponse

export type ConfirmRegistrationRequest = {
  confirmationCode: string
}

export type ResendConfirmationCodeRequest = {
  baseUrl: string
  email: string
}
export type GoogleLoginRequest = {
  code: string
}

export type GoogleLoginResponse = {
  accessToken: string
  email: string
}

export type SignUpRequest = {
  email: string
  password: string
  userName: string
}

export type UpdatePasswordRequest = {
  newPassword: string
  recoveryCode: string
}
