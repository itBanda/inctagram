export type SignInRequest = {
  email: string
  password: string
}

export type SignInResponse = {
  accessToken: string
}

export type SignUpRequest = {
  email: string
  password: string
  userName: string
}
