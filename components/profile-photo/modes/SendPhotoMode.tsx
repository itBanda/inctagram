import { useEffect, useState } from 'react'
import Cropper, { Area } from 'react-easy-crop'

import { Spinner } from '@/components/ui'
import { useTranslation } from '@/hooks/useTranslation'
import { profileApi } from '@/services'
import clsx from 'clsx'
import { Button } from 'uikit-inctagram'

type Props = {
  onClose: () => void
  profilePhoto: File
}
export const SendPhotoMode = ({ onClose, profilePhoto }: Props) => {
  const { t } = useTranslation()
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedArea, setCroppedArea] = useState<Area | null>(null)

  const [loadAvatar, { isLoading: isAvatarLoading }] = profileApi.useLoadAvatarMutation()
  const { refetch: refetchProfile } = profileApi.useProfileQuery()
  const [abortController, setAbortController] = useState<AbortController | null>(null)
  const [imageSrc, setImageSrc] = useState<null | string>(null)

  const getCroppedImg = async (imageSrc: string, pixelCrop: Area) => {
    const image = new Image()

    image.src = imageSrc

    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    canvas.width = pixelCrop.width
    canvas.height = pixelCrop.height

    ctx?.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height
    )

    return new Promise(resolve => {
      canvas.toBlob(blob => {
        resolve(blob)
      }, 'image/jpeg')
    })
  }

  useEffect(() => {
    const objectUrl = URL.createObjectURL(profilePhoto)

    setImageSrc(objectUrl)

    return () => URL.revokeObjectURL(objectUrl)
  }, [profilePhoto])

  useEffect(() => {
    return () => abortController?.abort()
  }, [abortController])

  const setPhoto = async () => {
    const controller = new AbortController()

    setAbortController(controller)
    const formData = new FormData()

    if (imageSrc && croppedArea) {
      const croppedImg = await getCroppedImg(imageSrc, croppedArea)

      formData.append('file', croppedImg as Blob)
    }

    try {
      await loadAvatar({ abort: controller.signal, formData }).unwrap()
      onClose()
      await refetchProfile()
    } catch (err) {
      console.error(err)
    }
  }

  const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedArea(croppedAreaPixels)
  }
  const handleWheel = (e: WheelEvent) => {
    e.preventDefault()
    const newZoom = zoom - e.deltaY * 0.001

    setZoom(Math.min(Math.max(newZoom, 1), 3))

    return false
  }

  return (
    <div className='relative flex h-full w-full flex-col items-center justify-center'>
      <div
        className={clsx(
          'relative flex h-[340px] w-[332px] items-center justify-center overflow-hidden rounded-sm',
          { 'opacity-50': isAvatarLoading }
        )}
      >
        {isAvatarLoading && <Spinner className='inset-auto z-30' />}
        {imageSrc && (
          <Cropper
            crop={crop}
            cropShape='round'
            cropSize={{ height: 340, width: 332 }}
            image={imageSrc}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onWheelRequest={handleWheel}
            onZoomChange={setZoom}
            showGrid={false}
            zoom={zoom}
          />
        )}
      </div>
      <div className='flex w-full justify-end'>
        <Button className='mt-9' disabled={isAvatarLoading} onClick={setPhoto}>
          {t.profile.modal.saveButton}
        </Button>
      </div>
    </div>
  )
}
