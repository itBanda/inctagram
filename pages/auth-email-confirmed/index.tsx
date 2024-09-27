import { getAuthLayout } from '@/components'
import { AuthMessage } from '@/components/auth-message/AuthMessage'
import congratulationsImg from '@/public/auth-img/congratulations.svg'

const AuthEmailConfirmed = () => {
  return (
    <AuthMessage
      buttonText='Sign In'
      href='/sign-in'
      imageSrc={congratulationsImg}
      message='Your email has been confirmed'
      title='Congratulations'
    />
  )
}

export default AuthEmailConfirmed
AuthEmailConfirmed.getLayout = getAuthLayout
