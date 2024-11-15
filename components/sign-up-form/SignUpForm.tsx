import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { EmailSentModal } from '@/components'
import { Trans } from '@/components/transtlate-with-tags/Trans'
import { useTranslation } from '@/hooks/useTranslation'
import { LocaleType } from '@/public'
import { authApi, isApiError, isFetchBaseQueryError } from '@/services'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { Button, Checkbox, Input, PasswordInput, Typography } from 'uikit-inctagram'
import { z } from 'zod'

const SignUpSchema = (t: LocaleType) =>
  z
    .object({
      email: z.string().trim().email(t.authPage.form.email.help),
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
      terms: z.boolean(),
      userName: z
        .string()
        .trim()
        .regex(/^[A-Za-z0-9_-]+$/, t.formValidation.userNameRegex)
        .min(6, t.formValidation.minCharacters(6))
        .max(30, t.formValidation.maxCharacters(30)),
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
    trigger,
    watch,
  } = useForm<FormFields>({
    defaultValues: {
      email: '',
      password: '',
      passwordConfirmation: '',
      terms: false,
      userName: '',
    },
    mode: 'onBlur',
    resolver: zodResolver(SignUpSchema(t)),
  })

  const isTermsAccepted = watch('terms')

  useEffect(() => {
    reset()
  }, [t, reset])
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
          <input className='hidden' name='username' type='text' />
          <Input
            errorText={errors.userName?.message}
            label={t.profileSettings.userName}
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

          <input className='hidden' name='password' type='password' />
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
            <Checkbox
              checked={isTermsAccepted}
              {...register('terms', {
                onChange: async () => await trigger('terms'),
              })}
            />
            <Trans
              className='text-xs font-normal text-light-500'
              tags={{
                1: content => (
                  <Link className='text-accent-500 underline' href='/terms-of-service'>
                    {content}
                  </Link>
                ),
                2: content => (
                  <Link className='text-accent-500 underline' href='/privacy-policy'>
                    {content}
                  </Link>
                ),
              }}
              text={t.authPage.form.agree(t.authPage.form.terms.with, t.authPage.form.privacy.with)}
            />
          </label>
        </div>

        <Button className='w-full cursor-pointer' disabled={!isValid || !isDirty || isLoading}>
          {t.authPage.button.signUp}
        </Button>
      </form>
      <EmailSentModal
        body={
          <Typography.TextBase>
            {t.authPage.form.email.sentLink(watch('email'))}
          </Typography.TextBase>
        }
        isOpened={isModalOpen}
        onClose={handlerCloseModal}
        title={t.authPage.form.email.sent}
      />
    </>
  )
}
