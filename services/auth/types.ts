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
export type GoogleRequest = {
  code: string
  scope?: string
}

export type GoogleResponse = {
  accessToken: string
  email: string
}
