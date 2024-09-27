import React from 'react'

import { getAuthLayout } from '@/components'
import { SignUpForm } from '@/components/sign-up-form'
import Link from 'next/link'
import { Button, Card, Icon, Typography } from 'uikit-inctagram'

const SignUp = () => {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center bg-dark-900'>
      <Card className='max-w-[378px] text-light-900'>
        <Typography.H1 className='mb-4 text-center text-light-100'>Sign Up</Typography.H1>

        <div className='mb-4 flex justify-center gap-8 space-x-4'>
          <Icon height={36} icon='google' width={36} />
          <Icon color='white' height={36} icon='github' width={36} />
        </div>
        <SignUpForm />
        <div className='mt-4 flex-col gap-3 text-center'>
          <Typography.TextBase className='text-white'>Do you have an account?</Typography.TextBase>
          <Button variant='text'>
            <Link href='/sign-in'>Sign In</Link>
          </Button>
        </div>
      </Card>
    </div>
  )
}

export default SignUp

SignUp.getLayout = getAuthLayout
