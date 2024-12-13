import { Icon, Spinner } from '@/components'
import Image from 'next/image'

type Props = {
  alt?: string
  imageUrl?: string
  isLoading?: boolean
}

export const Avatar = (props: Props) => {
  return (
    <div className='relative flex size-48 items-center justify-center overflow-hidden rounded-full bg-dark-500'>
      <AvatarContent {...props} />
    </div>
  )
}

const AvatarContent = ({ alt, imageUrl, isLoading }: Props) => {
  if (isLoading) {
    return <Spinner className='absolute inset-auto' />
  }

  if (!imageUrl) {
    return <Icon className='text-light-100' height={48} icon='image-outline' width={48} />
  }

  return <Image alt={`${alt} avatar`} height={192} priority src={imageUrl} width={192} />
}
