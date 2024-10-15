import { ChangeEvent, useRef, useState } from 'react'

import { useTranslation } from '@/hooks/useTranslation'
import { Button, Card, Icon } from 'uikit-inctagram'

type Props = {
  setProfilePhoto: (photo: null | string) => void
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
      const reader = new FileReader()
      const maxFileSizeMB = 10
      const maxFileSizeBytes = maxFileSizeMB * 1024 * 1024

      if (photo.size > maxFileSizeBytes) {
        setPhotoError(`Error! Photo size must be less than ${maxFileSizeMB} MB!`)

        return
      }
      if (photo.type !== 'image/png' && photo.type !== 'image/jpeg') {
        setPhotoError('Error! The format of the uploaded photo must be PNG and JPEG')

        return
      }
      reader.onloadend = () => {
        setProfilePhoto(reader.result as string)
      }
      reader.readAsDataURL(photo)
    }
  }

  return (
    <>
      <div className='mb-6 h-[60px] w-full border border-danger-500'>
        {photoError ? (
          photoError
        ) : (
          <span>размер падинга по Y у модалки захардкоджен в ui-kit py-[30px] ай ай ай</span>
        )}
      </div>
      <Card className='flex h-[228px] w-[222px] items-center justify-center'>
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
