import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { EmailSentModal } from '@/components'
import { authApi, isApiError, isFetchBaseQueryError } from '@/services'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Checkbox, Input, PasswordInput, Typography } from 'uikit-inctagram'
import { z } from 'zod'

const SignUpScheme = z
  .object({
    email: z.string().trim().email('Email must match the format example@example.com'),
    password: z
      .string()
      .trim()
      .min(6, 'Minimum number of characters 6')
      .max(20, 'Maximum number of characters 20')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~])/,
        'Password must contain a-z, A-Z, !"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~'
      ),
    passwordConfirmation: z.string().trim(),
    terms: z.literal(true, {
      errorMap: () => ({ message: 'You must accept the terms' }),
    }),
    userName: z
      .string()
      .trim()
      .regex(/^[A-Za-z0-9_-]+$/, 'Username can contain only A-Z, a-z, 0-9, _ or -')
      .min(6, 'Minimum number of characters 6')
      .max(30, 'Maximum number of characters 30'),
  })
  .refine(data => data.password === data.passwordConfirmation, {
    message: 'Passwords must match',
    path: ['passwordConfirmation'],
  })

type FormFields = z.infer<typeof SignUpScheme>

export const SignUpForm = () => {
  const [signUp, isLoading] = authApi.useSignUpMutation()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [body, setBody] = useState('')

  const {
    formState: { errors, isDirty, isValid },
    handleSubmit,
    register,
    reset,
    setError,
    watch,
  } = useForm<FormFields>({
    defaultValues: {
      email: '',
      password: '',
      passwordConfirmation: '',
      terms: undefined,
      userName: '',
    },
    mode: 'onBlur',
    resolver: zodResolver(SignUpScheme),
  })

  const onSubmit: SubmitHandler<FormFields> = async data => {
    try {
      await signUp(data).unwrap()

      setBody(`We have sent a link to confirm your email to ${data.email}`)
      setIsModalOpen(true)
      reset()
    } catch (err) {
      console.error('Registration failed:', err)
      if (isFetchBaseQueryError(err)) {
        if (isApiError(err.data)) {
          err.data.messages.forEach(message => {
            setError(message.field, {
              message: message.message,
            })
          })
        }
      }
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='mb-4'>
        <Input
          errorText={errors.userName?.message}
          label='Username'
          placeholder='Exapmle-123'
          type='text'
          {...register('userName')}
          className='text-light-900'
        />
      </div>

      <div className='mb-4'>
        <Input
          errorText={errors.email?.message}
          label='Email'
          placeholder='example@example.com'
          type='email'
          {...register('email')}
          className='text-light-900'
        />
      </div>

      <div className='relative mb-4'>
        <PasswordInput
          errorText={errors.password?.message}
          label='Password'
          placeholder='******'
          {...register('password')}
          className='text-light-900'
        />
      </div>

      <div className='relative mb-4'>
        <PasswordInput
          errorText={errors.passwordConfirmation?.message}
          label='PasswordConfirmation'
          placeholder='********'
          {...register('passwordConfirmation')}
          className='text-light-900'
        />
      </div>

      <div className='flex items-center'>
        <label className='flex items-center'>
          <Checkbox checked={watch('terms')} {...register('terms')} />
          <Typography.TextXs className='text-light-500'>
            I agree to the{' '}
            <Typography.LinkSm href='/terms-of-service'> Terms of Service</Typography.LinkSm> and{' '}
            <Typography.LinkSm className='text-accent-500 underline' href='/privacy-policy'>
              Privacy Policy
            </Typography.LinkSm>
          </Typography.TextXs>
        </label>
      </div>
      {errors.terms && (
        <Typography.TextXs className='mb-4 ml-3 text-red-700'>
          {errors.terms.message}
        </Typography.TextXs>
      )}

      <Button className='w-full cursor-pointer' disabled={!isValid || !isDirty || !isLoading}>
        Sign Up
      </Button>
      {isModalOpen && (
        <EmailSentModal
          body={body}
          isOpened
          onClose={() => setIsModalOpen(false)}
          title='Email sent'
        />
      )}
    </form>
  )
}
