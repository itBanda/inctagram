import React from 'react'

import { getAuthLayout } from '@/components'
import { ForgotPasswordForm } from '@/components/forgot-password-form/ForgotPasswordForm'
import { Card, Typography } from 'uikit-inctagram'

const ForgotPassword = () => {
  return (
    <section className='grid place-items-center px-4 py-9 text-light-100'>
      <Card className='flex w-full max-w-[378px] flex-col'>
        <Typography.H1 className='mb-[37px] text-center'>Forgot Password</Typography.H1>
        <ForgotPasswordForm />
      </Card>
    </section>
  )
}

export default ForgotPassword
ForgotPassword.getLayout = getAuthLayout
