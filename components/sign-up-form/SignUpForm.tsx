import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { EmailSentModal } from '@/components'
import { authApi, isApiError, isFetchBaseQueryError } from '@/services'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { Button, Checkbox, Input, PasswordInput } from 'uikit-inctagram'
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

type FormFields = { terms: boolean } & z.infer<typeof SignUpScheme>

export const SignUpForm = () => {
  const [signUp, { isLoading }] = authApi.useSignUpMutation()
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
      terms: false,
      userName: '',
    },
    mode: 'onChange',
    resolver: zodResolver(SignUpScheme),
  })

  const termsAccepted = watch('terms')

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
        />
      </div>

      <div className='mb-4'>
        <Input
          errorText={errors.email?.message}
          label='Email'
          placeholder='example@example.com'
          type='email'
          {...register('email')}
        />
      </div>

      <div className='relative mb-4'>
        <PasswordInput
          errorText={errors.password?.message}
          label='Password'
          placeholder='******'
          {...register('password')}
        />
      </div>

      <div className='relative mb-4'>
        <PasswordInput
          errorText={errors.passwordConfirmation?.message}
          label='Password Confirmation'
          placeholder='********'
          {...register('passwordConfirmation')}
        />
      </div>

      <div className='flex items-center'>
        <label className='flex items-center'>
          <Checkbox
            checked={termsAccepted}
            {...register('terms', {
              required: 'you must accept the terms',
            })}
          />
          <span className='text-xs font-normal text-light-500'>
            I agree to the{' '}
            <Link className='text-accent-500 underline' href='/terms-of-service'>
              {' '}
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link className='text-accent-500 underline' href='/privacy-policy'>
              Privacy Policy
            </Link>
          </span>
        </label>
      </div>

      <Button
        className='w-full cursor-pointer'
        disabled={!isValid || !isDirty || isLoading || !termsAccepted}
      >
        Sign Up
      </Button>
      <EmailSentModal
        body={body}
        isOpened={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title='Email sent'
      />
    </form>
  )
}
