export type PublicUserProfileResponse = {
  aboutMe: string
  avatars: Avatar[]
  id: number
  userName: string
}

export type Avatar = {
  createdAt: string
  fileSize: number
  height: number
  url: string
  width: number
}
