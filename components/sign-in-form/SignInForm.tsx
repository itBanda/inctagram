import { SubmitHandler, useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { Button, Input, PasswordInput, Typography } from 'uikit-inctagram'
import { z } from 'zod'

import { useLoginMutation } from '../../services/auth/authSlice'

const SignInFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, 'Required'),
})

type FormFields = z.infer<typeof SignInFormSchema>

export const SignInForm = () => {
  const [login, { error, isError, isLoading }] = useLoginMutation()
  const { formState, handleSubmit, register } = useForm<FormFields>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onBlur',
    resolver: zodResolver(SignInFormSchema),
  })
  const onSubmit: SubmitHandler<FormFields> = async values => {
    try {
      const response = await login(values).unwrap()
    } catch (error: unknown) {
      console.log(error)
    }
  }

  return (
    <form className='mb-[18px]' onSubmit={handleSubmit(onSubmit)}>
      <div className='mb-9 flex flex-col gap-6'>
        <Input
          errorText={formState.errors.email?.message}
          label='Email'
          placeholder='Example@gram.com'
          type='email'
          {...register('email')}
        />
        <PasswordInput
          errorText={formState.errors.password?.message}
          label='Password'
          placeholder='************'
          {...register('password')}
        />
      </div>
      <Typography.TextSm className='mb-6 text-right text-light-900'>
        <Link className='mb-6' href='#'>
          Forgot Password
        </Link>
      </Typography.TextSm>
      <Button className='w-full' disabled={isLoading || !formState.isValid}>
        Sign In
      </Button>
    </form>
  )
}
