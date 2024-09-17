import { SubmitHandler, useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Button, Input, PasswordInput, Typography } from 'uikit-inctagram'
import { z } from 'zod'

import { authActions } from '../../features'
import { authApi, isApiError, isFetchBaseQueryError } from '../../services/'
import { useAppDispatch } from '../../store'

const SignInFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, 'Required'),
})

type FormFields = z.infer<typeof SignInFormSchema>

export const SignInForm = () => {
  const [login, { error, isError, isLoading }] = authApi.useLoginMutation()
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { formState, handleSubmit, register, setError } = useForm<FormFields>({
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

      dispatch(authActions.setToken({ accessToken: response.accessToken }))
      router.push('/profile')
    } catch (err) {
      if (isFetchBaseQueryError(err)) {
        if (isApiError(err.data)) {
          if (typeof err.data.messages === 'string') {
            console.log(err.data.messages)
            setError('password', {
              message: 'The email or password are incorrect. Try again please',
            })
          } else {
            err.data.messages.forEach(message => {
              console.log(`${message.field}: ${message.message}`)
            })
          }
        }
      }
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
      <Button className='w-full' disabled={isLoading}>
        Sign In
      </Button>
    </form>
  )
}
