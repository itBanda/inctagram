import { ReactNode, useState } from 'react'

import { ProfilePhotoModal } from '@/components/modals/ProfilePhotoModal'
import { Spinner } from '@/components/ui'
import { useTranslation } from '@/hooks/useTranslation'
import { AvatarResponse, profileApi } from '@/services'
import Image from 'next/image'
import { Button, Icon } from 'uikit-inctagram'

type ProfilePhotoProps = {
  profileAvatars: AvatarResponse[]
}
export const ProfilePhoto = ({ profileAvatars }: ProfilePhotoProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const handleOpenModal = () => setIsModalOpen(true)
  const handleCloseModal = () => setIsModalOpen(false)
  const { t } = useTranslation()
  const { isFetching: isFetchingProfile, refetch: refetchProfile } = profileApi.useProfileQuery()
  const [deleteAvatar, { isLoading: isLoadingDeleteAvatar }] = profileApi.useDeleteAvatarMutation()

  const deleteAvatarHandler = async () => {
    try {
      await deleteAvatar().unwrap()
      await refetchProfile()
    } catch (err) {
      console.error('Failed to delete avatar:', err)
    }
  }
  let content: ReactNode

  if (isLoadingDeleteAvatar || isFetchingProfile) {
    content = <Spinner className='relative size-12 bg-transparent' />
  } else if (profileAvatars[0]) {
    content = <Image alt='profile photo' height={192} src={profileAvatars[0].url} width={192} />
  } else {
    content = <Icon height={48} icon='image-outline' width={48} />
  }

  return (
    <div className='relative w-[196px]'>
      {profileAvatars.length !== 0 && (
        <div className='absolute right-3 top-3 z-10 mx-auto flex size-6 items-center justify-center rounded-full bg-dark-700'>
          <Icon
            className='cursor-pointer rounded-full bg-danger-500'
            height={16}
            icon='close-outline'
            onClick={deleteAvatarHandler}
            width={16}
          />
        </div>
      )}

      <div className='relative mx-[2px] flex size-48 items-center justify-center overflow-hidden rounded-full bg-dark-500'>
        {content}
      </div>
      <Button className='mt-6 w-full cursor-pointer' onClick={handleOpenModal} variant='outlined'>
        {t.profile.addPhoto}
      </Button>

      <ProfilePhotoModal isOpened={isModalOpen} onClose={handleCloseModal} />
    </div>
  )
}
