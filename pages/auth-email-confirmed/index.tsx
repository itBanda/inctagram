import congratulationsImg from '@/assets/auth-img/congratulations.svg'
import { AuthMessage } from '@/components/auth-message/AuthMessage'
import { getAuthLayout } from '@/components/ui/layouts/AuthLayout'

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
