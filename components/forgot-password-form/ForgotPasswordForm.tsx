import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { authApi } from '@/services'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Button, Input, Modal, Recaptcha } from 'uikit-inctagram'
import { z } from 'zod'

const ForgotPasswordFormSchema = z.object({
  email: z.string().email(),
})

type FormFields = z.infer<typeof ForgotPasswordFormSchema>

export const ForgotPasswordForm = () => {
  const [forgotPassword, { error, isError, isLoading, isSuccess }] =
    authApi.usePasswordRecoveryMutation()
  const router = useRouter()
  const { formState, handleSubmit, register, setError } = useForm<FormFields>({
    defaultValues: {
      email: '',
    },
    mode: 'onBlur',
    resolver: zodResolver(ForgotPasswordFormSchema),
  })

  const [isModalOpened, setIsModalOpened] = useState(true)

  const onSubmit: SubmitHandler<FormFields> = async values => {
    try {
      const baseUrl = window.location.origin

      await forgotPassword({ baseUrl, ...values }).unwrap()
      setIsModalOpened(true)
      router.push('/check-email')
    } catch (err) {
      if (isError) {
        setError('email', {
          message: 'Failed to send reset link. Please try again.',
        })
      }
    }
  }
  const buttonText = isSuccess ? 'Send Link Again' : 'Send Link'

  return (
    <>
      <Modal isOpened={isModalOpened} onClose={() => setIsModalOpened(false)} title='Email sent'>
        <span>
          We have sent a link to confirm your email to
          {formState.defaultValues?.email}
        </span>
        <Button
          className='mt-[18px] w-[96px] self-end'
          onClick={() => setIsModalOpened(false)}
          variant='primary'
        >
          OK
        </Button>
      </Modal>
      <form className='mb-[18px] flex flex-col' onSubmit={handleSubmit(onSubmit)}>
        <Input label='Email' placeholder='Example@gram.com' type='email' {...register('email')} />
        {formState.errors.email && (
          <span className='text-red-500'>{formState.errors.email.message}</span>
        )}
        <span className='mt-[7px] font-normal text-light-900'>
          Enter your email address and we will send you further instructions
        </span>
        {isSuccess && (
          <span className='mt-[23px]'>
            The link has been sent by email. If you don’t receive an email send link again
          </span>
        )}
        <Button className='mb-[24px] mt-[17px]' disabled={isLoading} variant='primary'>
          {buttonText}
        </Button>
        <Button asChild className='mb-[24px] w-full text-center' variant='text'>
          <Link href='/sign-in'>Back to Sign in</Link>
        </Button>
        {!isSuccess && <div>КАПЧА</div>}
      </form>
    </>
  )
}
