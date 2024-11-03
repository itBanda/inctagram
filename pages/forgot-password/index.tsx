import { ForgotPasswordForm, getAuthLayout } from '@/components'
import { useTranslation } from '@/hooks/useTranslation'
import { Card, Typography } from 'uikit-inctagram'

const ForgotPassword = () => {
  const { t } = useTranslation()

  return (
    <section className='grid place-items-center px-4 py-9 text-light-100'>
      <Card className='flex w-full max-w-[378px] flex-col'>
        <Typography.H1 className='mb-[37px] text-center'>
          {t.authPage.form.password.forgot}
        </Typography.H1>
        <ForgotPasswordForm />
      </Card>
    </section>
  )
}

export default ForgotPassword
ForgotPassword.getLayout = getAuthLayout
