import AuthMessage from '@/pages/sign-up/registration'

import { getAuthLayout } from '../../components/ui/layouts/AuthLayout'
import congratulationsImg from './registration/assets/congratulations.svg'
import emailVerificationImg from './registration/assets/emailVerification.svg'

const SignUp = () => {
  return (
    <div className='text-center text-white'>
      SignUp
      <AuthMessage
        buttonText='Sign In'
        imageSrc={congratulationsImg}
        message='Your email has been confirmed'
        title='Congratulations'
      />
      <AuthMessage
        buttonText='Resend verification link'
        imageSrc={emailVerificationImg}
        message='Looks like the verification link has expired. Not to worry, we can send the link again'
        title='Email verification link expired'
      />
    </div>
  )
}

export default SignUp

SignUp.getLayout = getAuthLayout
