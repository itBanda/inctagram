import { getAuthLayout } from '@/components'
import { SignUpForm } from '@/components/sign-up-form'
import Link from 'next/link'
import { Button, Card, Icon, Typography } from 'uikit-inctagram'

const SignUp = () => {
  return (
    <section className='flex justify-center px-4 py-6'>
      <Card className='w-full max-w-[378px]'>
        <Typography.H1 className='mb-3 text-center text-light-100'>Sign Up</Typography.H1>

        <div className='mb-6 flex justify-center gap-16'>
          <Icon height={36} icon='google' width={36} />
          <Icon color='white' height={36} icon='github' width={36} />
        </div>
        <SignUpForm />
        <div className='flex flex-col items-center gap-2'>
          <Typography.TextBase className='mt-5 text-light-100'>
            Do you have an account?
          </Typography.TextBase>
          <Button asChild variant='text'>
            <Link href='/sign-in'>Sign In</Link>
          </Button>
        </div>
      </Card>
    </section>
  )
}

export default SignUp

SignUp.getLayout = getAuthLayout
