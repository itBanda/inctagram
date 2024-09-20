import Image from 'next/image'
import Link from 'next/link'
import { Button, Typography } from 'uikit-inctagram'

type Props = {
  buttonText: string
  href: string
  imageSrc: string
  message: string
  title: string
}
export const AuthMessage = ({ buttonText, href, imageSrc, message, title }: Props) => {
  return (
    <div className='flex flex-col items-center py-9 text-center'>
      <Typography.H1 className='mb-5 text-light-100'>{title}</Typography.H1>
      <Typography.TextBase className='max-w-[294px] text-light-100'>{message}</Typography.TextBase>
      <Button asChild className='mb-[72px] mt-14 min-w-44' variant='primary'>
        <Link href={href}>{buttonText}</Link>
      </Button>
      <Image alt={title} height={350} src={imageSrc} width={473} />
    </div>
  )
}
