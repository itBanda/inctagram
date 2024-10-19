import { useState } from 'react'

import { useTranslation } from '@/hooks/useTranslation'
import { profileApi } from '@/services'
import Image from 'next/image'
import { Button, Icon } from 'uikit-inctagram'

import { ProfilePhotoModal } from '../modals/ProfilePhotoModal'

export const ProfilePhoto = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const handleOpenModal = () => setIsModalOpen(true)
  const handleCloseModal = () => setIsModalOpen(false)
  const { t } = useTranslation()
  const { data: profile } = profileApi.useProfileQuery()

  return (
    <div className='m-6 box-border w-[196px]'>
      <div className='relative mx-[2px] flex h-48 w-48 items-center justify-center overflow-hidden rounded-full bg-dark-500'>
        {profile?.avatars[0] ? (
          <Image alt='profile photo' height={192} src={profile.avatars[0].url} width={192} />
        ) : (
          <Icon height={48} icon='image-outline' width={48} />
        )}
      </div>
      <Button className='mt-6 w-full' onClick={handleOpenModal} variant='outlined'>
        {t.profile.addPhoto}
      </Button>

      <ProfilePhotoModal isOpened={isModalOpen} onClose={handleCloseModal} />
    </div>
  )
}
