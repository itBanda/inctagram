import { useEffect } from 'react'

import { RecoveryPasswordForm, Spinner, getAuthLayout } from '@/components'
import { AuthMessage } from '@/components/auth-message/AuthMessage'
import emailVerificationImg from '@/public/auth-img/emailVerification.svg'
import { authApi } from '@/services'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Button, Card, Typography } from 'uikit-inctagram'

const Recovery = () => {
  const [
    checkRecoveryCode,
    { isError: isCheckRecoveryCodeError, isLoading: isCheckRecoveryCodeLoading },
  ] = authApi.useCheckRecoveryCodeMutation()

  const router = useRouter()
  const recoveryCode = router.query.code as string

  useEffect(() => {
    if (recoveryCode) {
      checkRecoveryCode({ recoveryCode })
    }
  }, [recoveryCode, checkRecoveryCode])

  if (isCheckRecoveryCodeLoading || !recoveryCode) {
    return <Spinner />
  }

  if (!isCheckRecoveryCodeError) {
    return (
      <AuthMessage
        action={
          <Button asChild className='mb-[72px] mt-14 min-w-44'>
            <Link href='/forgot-password'>Resend link</Link>
          </Button>
        }
        imageSrc={emailVerificationImg}
        message='Looks like the verification link has expired. Not to worry, we can send the link again'
        title='Email verification link expired'
      />
    )
  }

  return (
    <section className='grid place-items-center px-4 py-9 text-light-100'>
      <Card className='w-full max-w-[378px]'>
        <header className='mb-9'>
          <Typography.H1 className='text-center'>Create New Password</Typography.H1>
        </header>
        <RecoveryPasswordForm />
      </Card>
    </section>
  )
}

export default Recovery

Recovery.getLayout = getAuthLayout
