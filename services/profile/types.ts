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

export type ProfileRequest = {
  aboutMe?: string
  city?: string
  country?: string
  dateOfBirth?: string
  firstName: string
  lastName: string
  region?: string
  userName: string
}
