import { SubmitHandler, useForm } from 'react-hook-form'

import { useTranslation } from '@/hooks/useTranslation'
import { LocaleType } from '@/public/locales/types'
import { authApi, sessionsApi } from '@/services'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import { Button, PasswordInput, Typography } from 'uikit-inctagram'
import { z } from 'zod'

const RecoveryPasswordFormSchema = (t: LocaleType) =>
  z
    .object({
      password: z
        .string()
        .trim()
        .min(6, t.formValidation.minCharacters(6))
        .max(20, t.formValidation.maxCharacters(20))
        .regex(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~])/,
          t.authPage.form.password.regex
        ),
      passwordConfirmation: z.string().trim(),
    })
    .refine(({ password, passwordConfirmation }) => password === passwordConfirmation, {
      message: t.authPage.form.password.mismatch,
      path: ['passwordConfirmation'],
    })

type FormFields = z.infer<ReturnType<typeof RecoveryPasswordFormSchema>>

export const RecoveryPasswordForm = () => {
  const { t } = useTranslation()

  const [updatePassword, { isLoading: isUpdatePasswordLoading }] =
    authApi.useUpdatePasswordMutation()
  const [terminateAllSessions] = sessionsApi.useTerminateAllSessionsMutation()

  const router = useRouter()
  const recoveryCode = router.query.code as string

  const {
    formState: { errors, isValid },
    handleSubmit,
    register,
  } = useForm<FormFields>({
    defaultValues: {
      password: '',
      passwordConfirmation: '',
    },
    mode: 'onBlur',
    resolver: zodResolver(RecoveryPasswordFormSchema(t)),
  })

  const onSubmit: SubmitHandler<FormFields> = async values => {
    try {
      await updatePassword({ newPassword: values.password, recoveryCode }).unwrap()
      terminateAllSessions()
      router.push('/sign-in')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <form className='mb-3' onSubmit={handleSubmit(onSubmit)}>
      <div className='mb-10 flex flex-col gap-6'>
        <PasswordInput
          errorText={errors.password?.message}
          label={t.authPage.form.password.password}
          placeholder='******************'
          {...register('password')}
        />

        <div className='flex flex-col gap-2'>
          <PasswordInput
            errorText={errors.passwordConfirmation?.message}
            label={t.authPage.form.password.confirmation}
            placeholder='******************'
            {...register('passwordConfirmation')}
          />
          <Typography.TextSm className='text-light-900'>
            {t.authPage.form.password.help}
          </Typography.TextSm>
        </div>
      </div>
      <Button className='w-full' disabled={isUpdatePasswordLoading || !isValid}>
        {t.authPage.form.password.createNew}
      </Button>
    </form>
  )
}
