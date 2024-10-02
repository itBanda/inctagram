import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { EmailSentModal } from '@/components'
import { authApi, isApiError, isFetchBaseQueryError } from '@/services'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { Button, Checkbox, Input, PasswordInput, Typography } from 'uikit-inctagram'
import { z } from 'zod'

const SignUpSchema = z
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
    terms: z.boolean(),
    userName: z
      .string()
      .trim()
      .regex(/^[A-Za-z0-9_-]+$/, 'Username can contain only A-Z, a-z, 0-9, _ or -')
      .min(6, 'Minimum number of characters 6')
      .max(30, 'Maximum number of characters 30'),
  })
  .refine(data => data.terms, '')
  .refine(data => data.password === data.passwordConfirmation, {
    message: 'Passwords must match',
    path: ['passwordConfirmation'],
  })

type FormFields = z.infer<typeof SignUpSchema>

export const SignUpForm = () => {
  const [signUp, { isLoading }] = authApi.useSignUpMutation()
  const [isModalOpen, setIsModalOpen] = useState(false)

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
    resolver: zodResolver(SignUpSchema),
  })

  const isTermsAccepted = watch('terms')

  const onSubmit: SubmitHandler<FormFields> = async data => {
    try {
      await signUp(data).unwrap()

      setIsModalOpen(true)
    } catch (err) {
      console.error('Registration failed:', err)
      if (isFetchBaseQueryError(err)) {
        if (isApiError(err.data)) {
          if (Array.isArray(err.data.messages)) {
            err.data.messages.forEach(message => {
              setError(message.field as keyof FormFields, {
                message: message.message,
              })
            })
          }
        }
      }
    }
  }

  const handlerCloseModal = () => {
    setIsModalOpen(false)
    reset()
  }

  return (
    <>
      <form autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
        <div className='mb-2 flex flex-col gap-6'>
          <input name='username' readOnly='true' style={{ display: 'none' }} type='text' />
          <Input
            autoComplete='none'
            errorText={errors.userName?.message}
            id={`username-${Math.random()}`}
            label='Username'
            placeholder='Exapmle-123'
            type='text'
            {...register('userName')}
          />

          <Input
            autoComplete='email'
            errorText={errors.email?.message}
            label='Email'
            placeholder='example@example.com'
            type='email'
            {...register('email')}
          />

          <input name='password' readOnly='true' style={{ display: 'none' }} type='password' />
          <PasswordInput
            autocomlete='none'
            errorText={errors.password?.message}
            label='Password'
            placeholder='************'
            {...register('password')}
          />

          <PasswordInput
            autoComplete='none'
            errorText={errors.passwordConfirmation?.message}
            label='Password Confirmation'
            placeholder='************'
            {...register('passwordConfirmation')}
          />
        </div>

        <div className='flex flex-col'>
          <label className='mb-2 flex items-center'>
            <Checkbox checked={isTermsAccepted} {...register('terms')} />
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

        <Button className='w-full cursor-pointer' disabled={!isValid || !isDirty || isLoading}>
          Sign Up
        </Button>
      </form>
      <EmailSentModal
        body={
          <Typography.TextBase>
            We have sent a link to confirm your email to {watch('email')}
          </Typography.TextBase>
        }
        isOpened={isModalOpen}
        onClose={handlerCloseModal}
        title='Email sent'
      />
    </>
  )
}
