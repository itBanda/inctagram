import { useState } from 'react'
// eslint-disable-next-line import/no-named-as-default
import ReCAPTCHA from 'react-google-recaptcha'
import { SubmitHandler, useForm } from 'react-hook-form'

import { EmailSentModal } from '@/components'
import { useTranslation } from '@/hooks/useTranslation'
import { LocaleType } from '@/public/locales/types'
import { authApi } from '@/services'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Button, Input, Typography } from 'uikit-inctagram'
import { z } from 'zod'

const ForgotPasswordFormSchema = (t: LocaleType) =>
  z.object({
    email: z.string().email(t.authPage.form.email.invalid),
    recaptcha: z.string(),
  })

type FormFields = z.infer<ReturnType<typeof ForgotPasswordFormSchema>>

export const ForgotPasswordForm = () => {
  const { t } = useTranslation()
  const { locale } = useRouter()

  const [forgotPassword, { isLoading, isSuccess }] = authApi.usePasswordRecoveryMutation()
  const { formState, handleSubmit, register, setError, setValue, watch } = useForm<FormFields>({
    defaultValues: {
      email: '',
      recaptcha: '',
    },
    mode: 'onBlur',
    resolver: zodResolver(ForgotPasswordFormSchema(t)),
  })

  const [isModalOpened, setIsModalOpened] = useState(false)
  const handleChangeCaptcha = (token: null | string) => {
    setValue('recaptcha', token ?? '')
  }

  const onSubmit: SubmitHandler<FormFields> = async values => {
    try {
      const baseUrl = window.location.origin

      await forgotPassword({ baseUrl, ...values }).unwrap()
      setIsModalOpened(true)
    } catch (err) {
      setError('email', { message: t.authPage.forgotPassword.errorNotUser })
    }
  }
  const buttonText = isSuccess
    ? t.authPage.forgotPassword.sendLinkAgainBtn
    : t.authPage.forgotPassword.sendLinkBtn

  return (
    <>
      <EmailSentModal
        body={
          <Typography.TextBase>
            {t.authPage.form.email.sentLink(watch('email'))}
          </Typography.TextBase>
        }
        isOpened={isModalOpened}
        onClose={() => setIsModalOpened(false)}
        title={t.authPage.form.email.sent}
      />

      <form className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
        <Input
          errorText={formState.errors.email?.message}
          label={t.authPage.form.email.email}
          placeholder='Example@gram.com'
          type='email'
          {...register('email')}
        />
        <span className='mt-[7px] font-normal text-light-900'>
          {t.authPage.forgotPassword.enterEmail}
        </span>
        {isSuccess && (
          <span className='mt-[23px]'>{t.authPage.forgotPassword.linkHasBeenSent} </span>
        )}
        <Button
          className='mb-[24px] mt-[17px]'
          disabled={!formState.isValid || isLoading}
          variant='primary'
        >
          {buttonText}
        </Button>
        <Button asChild className='mb-[24px] w-full text-center' variant='text'>
          <Link href='/sign-in'>{t.authPage.backToSignIn}</Link>
        </Button>
        {!isSuccess && (
          <div className='w-[300px] self-center'>
            <ReCAPTCHA
              hl={locale}
              onChange={handleChangeCaptcha}
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
              theme='dark'
            />
          </div>
        )}
      </form>
    </>
  )
}
