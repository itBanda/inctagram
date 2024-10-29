import { AvatarResponse } from '@/services/types'

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
