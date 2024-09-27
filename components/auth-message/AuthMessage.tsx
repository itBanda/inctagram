import { ReactNode } from 'react'

import Image from 'next/image'
import { Typography } from 'uikit-inctagram'

type Props = {
  action: ReactNode
  imageSrc: string
  message: string
  title: string
}
export const AuthMessage = ({ action, imageSrc, message, title }: Props) => {
  return (
    <div className='flex flex-col items-center py-9 text-center'>
      <Typography.H1 className='mb-5 text-light-100'>{title}</Typography.H1>
      <Typography.TextBase className='max-w-[294px] text-light-100'>{message}</Typography.TextBase>
      {action}
      <Image alt={title} height={350} src={imageSrc} width={473} />
    </div>
  )
}
