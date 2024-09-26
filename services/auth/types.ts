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
