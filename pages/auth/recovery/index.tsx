import { useEffect } from 'react'

import emailVerificationImg from '@/assets/auth-img/emailVerification.svg'
import { RecoveryPasswordForm, Spinner, getAuthLayout } from '@/components'
import { AuthMessage } from '@/components/auth-message/AuthMessage'
import { useTranslation } from '@/hocs/useTranslation'
import { authApi } from '@/services'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Button, Card, Typography } from 'uikit-inctagram'

const Recovery = () => {
  const { t } = useTranslation()

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

  if (isCheckRecoveryCodeError) {
    return (
      <AuthMessage
        action={
          <Button asChild className='mb-[72px] mt-14 min-w-44'>
            <Link href='/forgot-password'>{t.recovery.resend}</Link>
          </Button>
        }
        imageSrc={emailVerificationImg}
        message={t.recovery.message}
        title={t.recovery.title}
      />
    )
  }

  return (
    <section className='grid place-items-center px-4 py-9 text-light-100'>
      <Card className='w-full max-w-[378px]'>
        <header className='mb-9'>
          <Typography.H1 className='text-center'>
            {t.authPage.form.password.createNew}
          </Typography.H1>
        </header>
        <RecoveryPasswordForm />
      </Card>
    </section>
  )
}

export default Recovery

Recovery.getLayout = getAuthLayout
