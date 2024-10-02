import { SubmitHandler, useForm } from 'react-hook-form'

import { authApi, sessionsApi } from '@/services'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import { Button, PasswordInput, Typography } from 'uikit-inctagram'
import { z } from 'zod'

const RecoveryPasswordFormSchema = z
  .object({
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
  })
  .refine(({ password, passwordConfirmation }) => password === passwordConfirmation, {
    message: 'The passwords must match',
    path: ['passwordConfirmation'],
  })

type FormFields = z.infer<typeof RecoveryPasswordFormSchema>

export const RecoveryPasswordForm = () => {
  const [updatePassword, { isLoading: isUpdatePasswordLoading }] =
    authApi.useUpdatePasswordMutation()
  const [terminateAllSessions] = sessionsApi.useTerminateAllSessionsMutation()

  const router = useRouter()
  const recoveryCode = router.query.code as string

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<FormFields>({
    defaultValues: {
      password: '',
      passwordConfirmation: '',
    },
    mode: 'onBlur',
    resolver: zodResolver(RecoveryPasswordFormSchema),
  })

  const onSubmit: SubmitHandler<FormFields> = async values => {
    try {
      await updatePassword({ newPassword: values.password, recoveryCode })
      terminateAllSessions()
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <form className='mb-3' onSubmit={handleSubmit(onSubmit)}>
      <div className='mb-10 flex flex-col gap-6'>
        <PasswordInput
          errorText={errors.password?.message}
          label='Password'
          placeholder='******************'
          {...register('password')}
        />

        <div className='flex flex-col gap-2'>
          <PasswordInput
            errorText={errors.passwordConfirmation?.message}
            label='Password confirmation'
            placeholder='******************'
            {...register('passwordConfirmation')}
          />
          <Typography.TextSm className='text-light-900'>
            Your password must be between 6 and 20 characters
          </Typography.TextSm>
        </div>
      </div>
      <Button className='w-full' disabled={isUpdatePasswordLoading}>
        Create new password
      </Button>
    </form>
  )
}
