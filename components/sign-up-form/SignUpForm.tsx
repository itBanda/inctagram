import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { EmailSentModal } from '@/components'
import { useTranslation } from '@/hocs/useTranslation'
import { authApi, isApiError, isFetchBaseQueryError } from '@/services'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { Button, Checkbox, Input, PasswordInput, Typography } from 'uikit-inctagram'
import { z } from 'zod'

const SignUpSchema = (t: any) =>
  z
    .object({
      email: z.string().trim().email(t.authPage.form.email.help),
      password: z
        .string()
        .trim()
        .min(6, t.authPage.form.minCharacters(6))
        .max(20, t.authPage.form.maxCharacters(20))
        .regex(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~])/,
          t.authPage.form.password.regex
        ),
      passwordConfirmation: z.string().trim(),
      terms: z.boolean(),
      userName: z
        .string()
        .trim()
        .regex(/^[A-Za-z0-9_-]+$/, 'Username can contain only A-Z, a-z, 0-9, _ or -')
        .min(6, t.authPage.form.minCharacters(6))
        .max(30, t.authPage.form.maxCharacters(30)),
    })
    .refine(data => data.terms, '')
    .refine(data => data.password === data.passwordConfirmation, {
      message: t.authPage.form.password.mismatch,
      path: ['passwordConfirmation'],
    })

type FormFields = z.infer<ReturnType<typeof SignUpSchema>>

export const SignUpForm = () => {
  const { t } = useTranslation()

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
    resolver: zodResolver(SignUpSchema(t)),
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='mb-2 flex flex-col gap-6'>
          <Input
            errorText={errors.userName?.message}
            label={t.authPage.form.userName}
            placeholder='Exapmle-123'
            type='text'
            {...register('userName')}
          />

          <Input
            errorText={errors.email?.message}
            label={t.authPage.form.email.email}
            placeholder='example@example.com'
            type='email'
            {...register('email')}
          />

          <PasswordInput
            errorText={errors.password?.message}
            label={t.authPage.form.password.password}
            placeholder='************'
            {...register('password')}
          />

          <PasswordInput
            errorText={errors.passwordConfirmation?.message}
            label={t.authPage.form.password.confirmation}
            placeholder='************'
            {...register('passwordConfirmation')}
          />
        </div>

        <div className='flex flex-col'>
          <label className='mb-2 flex items-center'>
            <Checkbox checked={isTermsAccepted} {...register('terms')} />
            <span className='text-xs font-normal text-light-500'>
              {t.authPage.form.agree}{' '}
              <Link className='text-accent-500 underline' href='/terms-of-service'>
                {' '}
                Terms of Service
              </Link>{' '}
              {t.authPage.form.and}{' '}
              <Link className='text-accent-500 underline' href='/privacy-policy'>
                Privacy Policy
              </Link>
            </span>
          </label>
        </div>

        <Button className='w-full cursor-pointer' disabled={!isValid || !isDirty || isLoading}>
          {t.authPage.signUp}
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
