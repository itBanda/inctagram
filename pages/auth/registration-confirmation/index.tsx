import { useLayoutEffect } from 'react'

import { Spinner, getAuthLayout } from '@/components'
import { AuthMessage } from '@/components/auth-message/AuthMessage'
import congratulationsImg from '@/public/auth-img/congratulations.svg'
import emailVerificationImg from '@/public/auth-img/emailVerification.svg'
import { authApi } from '@/services'
import { useAppSelector } from '@/store'
import { appSelectors } from '@/store/appSlice'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Button } from 'uikit-inctagram'

const RegistrationConfirmation = () => {
  const [confirmRegistration, { isError, isLoading }] = authApi.useConfirmRegistrationMutation()
  const isAppInitialized = useAppSelector(appSelectors.selectIsAppInitialized)
  const router = useRouter()
  const confirmationCode = router.query.code as string

  useLayoutEffect(() => {
    if (confirmationCode) {
      confirmRegistration({ confirmationCode })
    }
  }, [confirmRegistration, confirmationCode])

  if (isLoading || !isAppInitialized) {
    return <Spinner />
  }

  if (isError) {
    return (
      <AuthMessage
        action={<Button className='mb-[72px] mt-14 min-w-44'>Resend verification link</Button>}
        imageSrc={emailVerificationImg}
        message='Looks like the verification link has expired. Not to worry, we can send the link again'
        title='Email verification link expired'
      />
    )
  }

  return (
    <>
      <AuthMessage
        action={
          <Button asChild className='mb-[72px] mt-14 min-w-44'>
            <Link href='/sign-in'>Sign In</Link>
          </Button>
        }
        imageSrc={congratulationsImg}
        message='Your email has been confirmed'
        title='Congratulations'
      />
    </>
  )
}

export default RegistrationConfirmation
RegistrationConfirmation.getLayout = getAuthLayout
