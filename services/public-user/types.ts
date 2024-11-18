import { AvatarResponse } from '@/services/types'

export type PublicUserProfileResponse = {
  aboutMe: string
  avatars: AvatarResponse[]
  id: number
  userName: string
}
