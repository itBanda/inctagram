import { GithubLogin, GoogleLogin, SignInForm, getAuthLayout } from '@/components'
import { useTranslation } from '@/hooks/useTranslation'
import Link from 'next/link'
import { Button, Card, Typography } from 'uikit-inctagram'
const SignIn = () => {
  const { t } = useTranslation()

  return (
    <section className='grid place-items-center px-4 py-9 text-light-100'>
      <Card className='w-full max-w-[378px]'>
        <header className='mb-6 flex flex-col gap-3'>
          <Typography.H1 className='text-center'>{t.authPage.signIn}</Typography.H1>
          <div className='flex justify-center gap-16'>
            <GoogleLogin />
            <GithubLogin />
          </div>
        </header>
        <SignInForm />
        <footer className='flex flex-col items-center gap-3'>
          <Typography.TextBase className='light-100 text-center'>
            {t.authPage.form.haveAccount}
          </Typography.TextBase>
          <Button asChild variant='text'>
            <Link href='/sign-up'>{t.authPage.signUp}</Link>
          </Button>
        </footer>
      </Card>
    </section>
  )
}

export default SignIn

SignIn.getLayout = getAuthLayout
