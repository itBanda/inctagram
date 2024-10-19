import { ChangeEvent, useRef, useState } from 'react'

import { useTranslation } from '@/hooks/useTranslation'
import { Alert, Button, Card, Icon } from 'uikit-inctagram'

type Props = {
  setProfilePhoto: (photo: File | null) => void
}
export const ChoosePhotoMode = ({ setProfilePhoto }: Props) => {
  const [photoError, setPhotoError] = useState<string>()
  const { t } = useTranslation()
  const inputRef = useRef<HTMLInputElement | null>(null)

  const selectFile = () => {
    if (inputRef.current) {
      inputRef.current.click()
    }
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const photo = e.target.files ? e.target.files[0] : null

    if (photo) {
      const maxFileSizeMB = 10
      const maxFileSizeBytes = maxFileSizeMB * 1024 * 1024

      if (photo.size > maxFileSizeBytes) {
        setPhotoError(`Error! Photo size must be less than ${maxFileSizeMB} MB!`)

        return
      }

      if (photo.type !== 'image/png' && photo.type !== 'image/jpeg') {
        setPhotoError('Error! The format of the uploaded photo must be PNG or JPEG')

        return
      }

      setProfilePhoto(photo)
    }
  }

  return (
    <>
      {photoError && <Alert isOpened message={photoError} type='error' />}

      <Card className='mt-6 flex h-[228px] w-[222px] items-center justify-center'>
        <Icon height={48} icon='image-outline' width={48} />
      </Card>

      <input
        accept='image/*'
        className='hidden'
        onChange={handleFileChange}
        ref={inputRef}
        type='file'
      />
      <Button className='mt-9' onClick={selectFile}>
        {t.profile.modal.choosePhoto}
      </Button>
    </>
  )
}
