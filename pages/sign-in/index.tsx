import Link from 'next/link'
import { Button, Card, Icon, Input, PasswordInput, Typography } from 'ui-kit'

import { getAuthLayout } from '../../components/ui/layouts/AuthLayout'

const SignIn = () => {
  return (
    <section className='grid place-items-center px-4 pt-9 text-light-100'>
      <Card className='w-full max-w-[378px]'>
        <header className='mb-6 flex flex-col gap-3'>
          <Typography.H1 className='text-center'>Sign In</Typography.H1>
          <div className='flex justify-center gap-16'>
            <Icon height={36} icon='google' width={36} />
            <Icon height={36} icon='github' width={36} />
          </div>
        </header>
        <form className='mb-[18px]'>
          <div className='mb-9 flex flex-col gap-6'>
            <Input label='Email' name='email' placeholder='Example@gram.com' type='email' />
            <PasswordInput label='Password' name='password' placeholder='************' />
          </div>
          <Typography.TextSm className='mb-6 text-right text-light-900'>
            <Link className='mb-6' href='#'>
              Forgot Password
            </Link>
          </Typography.TextSm>
          <Button className='w-full'>Sign In</Button>
        </form>
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
