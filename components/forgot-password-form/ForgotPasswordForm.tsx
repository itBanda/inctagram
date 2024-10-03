import React, { useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { SubmitHandler, useForm } from 'react-hook-form'

import { EmailSentModal } from '@/components'
import { authApi } from '@/services'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Button, Input, Typography } from 'uikit-inctagram'
import { z } from 'zod'

const ForgotPasswordFormSchema = z.object({
  email: z.string().email(),
  recaptcha: z.string(),
})

type FormFields = z.infer<typeof ForgotPasswordFormSchema>

export const ForgotPasswordForm = () => {
  const [forgotPassword, { error, isError, isLoading, isSuccess }] =
    authApi.usePasswordRecoveryMutation()
  const { formState, handleSubmit, register, setError, setValue, watch } = useForm<FormFields>({
    defaultValues: {
      email: '',
      recaptcha: '',
    },
    mode: 'onBlur',
    resolver: zodResolver(ForgotPasswordFormSchema),
  })

  const [isModalOpened, setIsModalOpened] = useState(false)
  const handleChangeCaptcha = (token: string) => {
    setValue('recaptcha', token)
  }

  const onSubmit: SubmitHandler<FormFields> = async values => {
    try {
      const baseUrl = window.location.origin

      await forgotPassword({ baseUrl, ...values }).unwrap()
      setIsModalOpened(true)
    } catch (err) {
      setError('email', { message: "User with this email doesn't exist" })
    }
  }
  const buttonText = isSuccess ? 'Send Link Again' : 'Send Link'

  return (
    <>
      <EmailSentModal
        body={
          <Typography.TextBase>
            We have sent a link to confirm your email to {watch('email')}
          </Typography.TextBase>
        }
        isOpened={isModalOpened}
        onClose={() => setIsModalOpened(false)}
        title='Email sent'
      />

      <form className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
        <Input
          errorText={formState.errors.email?.message}
          label='Email'
          placeholder='Example@gram.com'
          type='email'
          {...register('email')}
        />
        <span className='mt-[7px] font-normal text-light-900'>
          Enter your email address and we will send you further instructions
        </span>
        {isSuccess && (
          <span className='mt-[23px]'>
            The link has been sent by email. If you don’t receive an email send link again
          </span>
        )}
        <Button
          className='mb-[24px] mt-[17px]'
          disabled={!formState.isValid || isLoading}
          variant='primary'
        >
          {buttonText}
        </Button>
        <Button asChild className='mb-[24px] w-full text-center' variant='text'>
          <Link href='/sign-in'>Back to Sign in</Link>
        </Button>
        {!isSuccess && (
          <div className='w-[300px] self-center'>
            <ReCAPTCHA
              hl='en'
              onChange={handleChangeCaptcha}
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
              theme='dark'
            />
          </div>
        )}
      </form>
    </>
  )
}
