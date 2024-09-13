import { getAuthLayout } from '@/components/ui/layouts/AuthLayout'
import Image from 'next/image'

type Props = {
  buttonText: string
  imageSrc: string
  message: string
  title: string
}
const AuthMessage = ({ buttonText, imageSrc, message, title }: Props) => {
  return (
    <main className='flex flex-col items-center'>
      <h2 className='mb-5 mt-[35px] text-xl font-bold leading-[180%]'>{title}</h2>
      <p className='w-[294px] text-base font-normal leading-[150%]'>{message}</p>
      <button
        className='mb-[72px] mt-[54px] rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600'
        type='button'
      >
        {buttonText}
      </button>
      <Image alt={title} height={350} src={imageSrc} width={473} />
    </main>
  )
}

export default AuthMessage

AuthMessage.getLayout = getAuthLayout
