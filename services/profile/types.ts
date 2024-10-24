export type ProfileResponse = {
  aboutMe: string
  avatars: AvatarResponse[]
  city: string
  country: string
  createdAt: string
  dateOfBirth: string
  firstName: string
  id: number
  lastName: string
  region: string
  userName: string
}

export type AvatarResponse = {
  createdAt: string
  fileSize: number
  height: number
  url: string
  width: number
}
