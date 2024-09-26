export type SignInRequest = {
  email: string
  password: string
}

export type SignInResponse = {
  accessToken: string
}

export type UpdateTokensResponse = SignInResponse

export type ConfirmRegistrationRequest = {
  confirmationCode: string
}
