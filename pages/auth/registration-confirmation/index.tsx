import { useEffect } from 'react'

import congratulationsImg from '@/assets/auth-img/congratulations.svg'
import emailVerificationImg from '@/assets/auth-img/emailVerification.svg'
import { Spinner, getAuthLayout } from '@/components'
import { AuthMessage } from '@/components/auth-message/AuthMessage'
import { useTranslation } from '@/hocs/useTranslation'
import { authApi } from '@/services'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Button } from 'uikit-inctagram'

const RegistrationConfirmation = () => {
  const { t } = useTranslation()

  const [confirmRegistration, { isError, isLoading: isConfirmRegistrationLoading }] =
    authApi.useConfirmRegistrationMutation()
  const [resendCode, { isLoading: isResendCodeLoading }] =
    authApi.useResendConfirmationCodeMutation()

  const router = useRouter()
  const confirmationCode = router.query.code as string
  const email = router.query.email as string

  const handleResendCode = () => {
    const baseUrl = window.location.origin

    resendCode({ baseUrl, email })
  }

  useEffect(() => {
    if (confirmationCode) {
      confirmRegistration({ confirmationCode })
    }
  }, [confirmRegistration, confirmationCode])

  if (isConfirmRegistrationLoading || !confirmationCode) {
    return <Spinner />
  }

  if (isError) {
    return (
      <AuthMessage
        action={
          <Button
            className='mb-[72px] mt-14 min-w-44'
            disabled={isResendCodeLoading}
            onClick={handleResendCode}
          >
            {t.recovery.resend}
          </Button>
        }
        imageSrc={emailVerificationImg}
        message={t.recovery.message}
        title={t.recovery.title}
      />
    )
  }

  return (
    <>
      <AuthMessage
        action={
          <Button asChild className='mb-[72px] mt-14 min-w-44'>
            <Link href='/sign-in'>{t.authPage.signIn}</Link>
          </Button>
        }
        imageSrc={congratulationsImg}
        message={t.recovery.messageCongratulations}
        title={t.recovery.congratulations}
      />
    </>
  )
}

export default RegistrationConfirmation
RegistrationConfirmation.getLayout = getAuthLayout