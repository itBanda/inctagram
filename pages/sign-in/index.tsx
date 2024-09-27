import { SignInForm, getAuthLayout } from '@/components'
import { gitHubLogin } from '@/features'
import Link from 'next/link'
import { Button, Card, Icon, Typography } from 'uikit-inctagram'

const SignIn = () => {
  return (
    <section className='grid place-items-center px-4 py-9 text-light-100'>
      <Card className='w-full max-w-[378px]'>
        <header className='mb-6 flex flex-col gap-3'>
          <Typography.H1 className='text-center'>Sign In</Typography.H1>
          <div className='flex justify-center gap-16'>
            <Icon height={36} icon='google' width={36} />
            <Icon height={36} icon='github' onClick={gitHubLogin} width={36} />
          </div>
        </header>
        <SignInForm />
        <footer className='flex flex-col items-center gap-3'>
          <Typography.TextBase className='light-100 text-center'>
            Don’t have an account?
          </Typography.TextBase>
          <Button asChild variant='text'>
            <Link href='/sign-up'>Sign Up</Link>
          </Button>
        </footer>
      </Card>
    </section>
  )
}

export default SignIn

SignIn.getLayout = getAuthLayout
