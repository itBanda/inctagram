import { useState } from 'react'

import { Avatar } from '@/components/avatar/Avatar'
import { ProfilePhotoModal } from '@/components/modals/ProfilePhotoModal'
import { useTranslation } from '@/hooks/useTranslation'
import { AvatarResponse, profileApi } from '@/services'
import { Button, Icon } from 'uikit-inctagram'

type ProfilePhotoProps = {
  profileAvatars: AvatarResponse[]
}
export const ProfilePhoto = ({ profileAvatars }: ProfilePhotoProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const handleOpenModal = () => setIsModalOpen(true)
  const handleCloseModal = () => setIsModalOpen(false)
  const { t } = useTranslation()
  const {
    data: profileData,
    isFetching: isFetchingProfile,
    refetch: refetchProfile,
  } = profileApi.useProfileQuery()
  const [deleteAvatar, { isLoading: isLoadingDeleteAvatar }] = profileApi.useDeleteAvatarMutation()

  const isAvatarLoading = isFetchingProfile || isLoadingDeleteAvatar

  const deleteAvatarHandler = async () => {
    try {
      await deleteAvatar().unwrap()
      await refetchProfile()
    } catch (err) {
      console.error('Failed to delete avatar:', err)
    }
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
      <Avatar
        alt={profileData?.userName}
        imageUrl={profileAvatars[0]?.url}
        isLoading={isAvatarLoading}
      />
      <Button className='mt-6 w-full cursor-pointer' onClick={handleOpenModal} variant='outlined'>
        {t.profile.addPhoto}
      </Button>

      <ProfilePhotoModal isOpened={isModalOpen} onClose={handleCloseModal} />
    </div>
  )
}
