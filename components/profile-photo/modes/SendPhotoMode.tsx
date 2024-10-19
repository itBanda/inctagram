import { useEffect, useState } from 'react'
import Cropper from 'react-easy-crop'

import { Spinner } from '@/components/ui'
import { useTranslation } from '@/hooks/useTranslation'
import { profileApi } from '@/services'
import { Button } from 'uikit-inctagram'

type CroppedArea = { height: number; width: number; x: number; y: number }
type Props = {
  onClose: () => void
  profilePhoto: File
}
export const SendPhotoMode = ({ onClose, profilePhoto }: Props) => {
  const { t } = useTranslation()
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedArea, setCroppedArea] = useState<CroppedArea | null>(null)

  const [loadAvatar, { isLoading }] = profileApi.useLoadAvatarMutation()
  const { refetch } = profileApi.useProfileQuery()
  const [abortController, setAbortController] = useState<AbortController | null>(null)
  const [imageSrc, setImageSrc] = useState<null | string>(null)

  const getCroppedImg = async (imageSrc: string, pixelCrop: CroppedArea) => {
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
    const croppedImg = await getCroppedImg(imageSrc!, croppedArea!)

    formData.append('file', croppedImg as Blob)
    try {
      await loadAvatar({ abort: controller.signal, formData }).unwrap()
      onClose()
      await refetch()
    } catch (err) {
      console.error(err)
    }
  }

  const onCropComplete = (croppedArea: CroppedArea, croppedAreaPixels: CroppedArea) => {
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
      <div className='relative flex h-[340px] w-[332px] items-center justify-center overflow-hidden rounded-sm'>
        {isLoading && (
          <>
            <div className='absolute inset-0 z-20 bg-black opacity-70' />
            <Spinner className='z-30' modal />
          </>
        )}
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
        <Button className='mt-9' disabled={isLoading} onClick={setPhoto}>
          {t.profile.modal.saveButton}
        </Button>
      </div>
    </div>
  )
}
