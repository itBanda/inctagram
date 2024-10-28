import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

import { useTranslation } from '@/hooks/useTranslation'
import { Modal } from 'uikit-inctagram'

import { ChoosePhotoMode, SendPhotoMode } from '../profile-photo'

type Props = {
  isOpened: boolean
  onClose: () => void
}

export const ProfilePhotoModal = ({ isOpened, onClose }: Props) => {
  const { t } = useTranslation()
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null)

  useEffect(() => {
    if (!isOpened) {
      setProfilePhoto(null)
    }
  }, [isOpened])

  if (typeof window === 'undefined') {
    return null
  }

  return createPortal(
    <Modal
      className='min-h-[536px] max-w-[492px]'
      isOpened={isOpened}
      onClose={onClose}
      title={t.profile.photoModal.title}
    >
      <div className='relative flex flex-col items-center justify-center'>
        {profilePhoto ? (
          <SendPhotoMode onClose={onClose} profilePhoto={profilePhoto} />
        ) : (
          <ChoosePhotoMode setProfilePhoto={setProfilePhoto} />
        )}
      </div>
    </Modal>,
    window.document.getElementById('modal-container')!
  )
}
