import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { getAuthLayout } from '@/components/ui/layouts/AuthLayout'
import { authApi } from '@/services'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { Button, Card, Checkbox, Icon, Input, PasswordInput, Typography } from 'uikit-inctagram'
import { z } from 'zod'

// type SignUpFormData = {
//   email: string
//   password: string
//   passwordConfirmation: string
//   terms: boolean
//   userName: string
// }

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

const SignUp = () => {
  const [signUp, isLoading] = authApi.useSignUpMutation()
  const {
    formState: { errors, isDirty, isValid },
    handleSubmit,
    register,
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
      const response = await signUp(data).unwrap()

      console.log('Registration successful:', response)
      alert(`We have sent a link to confirm your email to ${data.email}`)
      // reset()
    } catch (err) {
      console.error('Registration failed:', err)
    }
  }

  return (
    <div className='flex min-h-screen flex-col items-center justify-center bg-dark-900'>
      <Card className='max-w-[378px]'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Typography.H1 className='mb-4 text-center text-light-100'>Sign Up</Typography.H1>

          <div className='mb-4 flex justify-center gap-8 space-x-4'>
            <Icon height={36} icon='google' width={36} />
            <Icon color='white' height={36} icon='github' width={36} />
          </div>

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
              <Checkbox {...register('terms')} />
              <Typography.TextXs className='text-light-500'>
                I agree to the{' '}
                <Typography.LinkSm href='/terms-of-service'> Terms of Service</Typography.LinkSm>{' '}
                and{' '}
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

          <Button className='w-full cursor-pointer' disabled={!isValid || !isDirty}>
            Sign Up
          </Button>

          <div className='mt-4 flex-col gap-3 text-center'>
            <Typography.TextBase className='text-white'>
              Do you have an account?
            </Typography.TextBase>
            <Button variant='text'>
              <Link href='/sign-in'>Sign In</Link>
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}

export default SignUp

SignUp.getLayout = getAuthLayout
