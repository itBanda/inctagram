import emailVerificationImg from '@/assets/auth-img/emailVerification.svg'
import { AuthMessage } from '@/components/auth-message/AuthMessage'
import { getAuthLayout } from '@/components/ui/layouts/AuthLayout'

const AuthEmailExpired = () => {
  return (
    <AuthMessage
      buttonText='Resend verification link'
      href='/sign-up'
      imageSrc={emailVerificationImg}
      message='Looks like the verification link has expired. Not to worry, we can send the link again'
      title='Email verification link expired'
    />
  )
}

export default AuthEmailExpired
AuthEmailExpired.getLayout = getAuthLayout
