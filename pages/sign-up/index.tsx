import React from 'react'
import { useForm } from 'react-hook-form'

import { getAuthLayout } from '@/components/ui/layouts/AuthLayout'
import { zodResolver } from '@hookform/resolvers/zod'
import { Card, Checkbox, Icon, Input, PasswordInput, Typography } from 'ui-kit'
import { z } from 'zod'

type SignUpFormData = {
  email: string
  password: string
  passwordConfirmation: string
  terms: boolean
  username: string
}

const SignUpScheme = z
  .object({
    email: z.string().email('Email must match the format example@example.com'),
    password: z
      .string()
      .min(6, 'Minimum number of characters 6')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~])/,
        'Password must contain a-z, A-Z, !"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~'
      ),
    passwordConfirmation: z.string(),
    terms: z.literal(true, {
      errorMap: () => ({ message: 'You must accept the terms' }),
    }),
    username: z
      .string()
      .min(6, 'Minimum number of characters 6')
      .max(30, 'Maximum number of characters 30'),
  })
  .refine(data => data.password === data.passwordConfirmation, {
    message: 'Passwords do not match',
    path: ['passwordConfirmation'],
  })

const SignUp = () => {
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<SignUpFormData>({
    resolver: zodResolver(SignUpScheme),
  })

  const onSubmit = handleSubmit(data => {
    console.log(data)
  })

  return (
    <div className='flex min-h-screen flex-col items-center justify-center bg-dark-900'>
      <Card>
        <form onSubmit={onSubmit}>
          <Typography.H1 className='mb-4 text-center text-light-100'>Sign Up</Typography.H1>

          <div className='mb-4 flex justify-center gap-8 space-x-4'>
            <Icon icon='google' />
            <Icon color='white' icon='github' />
          </div>

          <div className='mb-4'>
            <Input
              label='Username'
              type='text'
              {...register('username')}
              className='text-light-900'
            />
            {errors.username && <p className='text-red-500'>{errors.username.message}</p>}
          </div>

          <div className='mb-4'>
            <Input label='Email' type='email' {...register('email')} className='text-light-900' />
            {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
          </div>

          <div className='relative mb-4'>
            <PasswordInput {...register('password')} className='text-light-900' />
            {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
          </div>

          <div className='relative mb-4'>
            <PasswordInput
              label='Password confirmation'
              {...register('passwordConfirmation')}
              className='text-light-900'
            />
            {errors.passwordConfirmation && (
              <p className='text-red-500'>{errors.passwordConfirmation.message}</p>
            )}
          </div>

          <div className='flex items-center'>
            <label className='flex items-center'>
              <Checkbox {...register('terms')} />
              <p className='text-light-500'>
                I agree to the{' '}
                <Typography.LinkBase href='/terms'> Terms of Service</Typography.LinkBase> and{' '}
                <Typography.LinkBase className='text-accent-500 underline' href='/privacy'>
                  Privacy Policy
                </Typography.LinkBase>
              </p>
            </label>
          </div>
          {errors.terms && <p className='mb-4 ml-3 text-red-500'>{errors.terms.message}</p>}

          <button className='w-full rounded bg-blue-500 py-2 text-white' type='submit'>
            Sign Up
          </button>

          <div className='mt-4 flex-col text-center'>
            <p className='text-white'>Do you have an account?</p>
            <Typography.LinkBase className='text-blue-500' href='/sign-in'>
              Sign In
            </Typography.LinkBase>
          </div>
        </form>
      </Card>
    </div>
  )
}

export default SignUp

SignUp.getLayout = getAuthLayout
