import { GithubLogin, GoogleLogin, SignUpForm, getAuthLayout } from '@/components'
import { useTranslation } from '@/hooks/useTranslation'
import Link from 'next/link'
import { Button, Card, Typography } from 'uikit-inctagram'

const SignUp = () => {
  const { t } = useTranslation()

  return (
    <section className='flex justify-center px-4 py-6'>
      <Card className='w-full max-w-[378px]'>
        <Typography.H1 className='mb-3 text-center text-light-100'>
          {t.authPage.signUp}
        </Typography.H1>
        <div className='mb-6 flex justify-center gap-16'>
          <GoogleLogin />
          <GithubLogin />
        </div>
        <SignUpForm />
        <div className='flex flex-col items-center gap-2'>
          <Typography.TextBase className='mt-5 text-light-100'>
            {t.authPage.form.haveAccount}
          </Typography.TextBase>
          <Button asChild variant='text'>
            <Link href='/sign-in'>{t.authPage.signIn}</Link>
          </Button>
        </div>
      </Card>
    </section>
  )
}

export default SignUp

SignUp.getLayout = getAuthLayout
