import { useMemo, useState } from 'react'
import { FieldPath, SubmitHandler, useController, useForm } from 'react-hook-form'

import { useTranslation } from '@/hooks/useTranslation'
import { LocaleType } from '@/public'
import { authApi, isApiError, isFetchBaseQueryError } from '@/services'
import { profileApi } from '@/services/profile/profileSlice'
import { zodResolver } from '@hookform/resolvers/zod'
import { City, Country } from 'country-state-city'
import Link from 'next/link'
import { Alert, Button, DatePicker, Input, Select, TextArea } from 'uikit-inctagram'
import { z } from 'zod'

const today = new Date()
const minimumAge = 13
const minimumDate = new Date(today.getFullYear() - minimumAge, today.getMonth(), today.getDate())

const ProfileSchema = (t: LocaleType) =>
  z
    .object({
      aboutMe: z
        .string()
        .trim()
        .max(200, t.profileSettings.errors.maxCharacters(200))
        .regex(/^[a-zA-Z0-9А-Яа-я\d!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~ ]*$/),
      city: z.string(),
      country: z.string(),
      dateOfBirth: z.string(),
      firstName: z
        .string()
        .trim()
        .min(1, t.profileSettings.errors.mandatory)
        .max(50)
        .regex(/^[a-zA-ZА-Яа-я]*$/, t.profileSettings.errors.first_last_name_Regex),
      lastName: z
        .string()
        .trim()
        .min(1, t.profileSettings.errors.mandatory)
        .max(50)
        .regex(/^[a-zA-ZА-Яа-я]*$/, t.profileSettings.errors.first_last_name_Regex),
      region: z.string(),
      userName: z
        .string()
        .trim()
        .min(1, t.profileSettings.errors.mandatory)
        .min(6, t.profileSettings.errors.minCharacters(6))
        .max(30, t.profileSettings.errors.maxCharacters(30))
        .regex(/^[A-Za-z0-9_-]+$/, t.profileSettings.errors.userNameRegex),
    })
    .refine(
      data => {
        const date = new Date(data.dateOfBirth)

        return date < minimumDate
      },
      {
        message: t.profileSettings.errors.date_of_birth,
        path: ['dateOfBirth'],
      }
    )

type FormFields = z.infer<ReturnType<typeof ProfileSchema>>

export const GeneralInformationForm = () => {
  const { t } = useTranslation()
  const { data } = authApi.useAuthMeQuery()
  const [setProfileInfo, { isLoading }] = profileApi.useSetProfileInfoMutation()
  const dataUsername = data?.userName

  const [uiAlert, setUiAlert] = useState({
    isOpened: false,
    message: '',
    type: 'success' as 'error' | 'success' | 'warning',
  })

  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    setError,
    trigger,
  } = useForm<FormFields>({
    mode: 'onBlur',
    resolver: zodResolver(ProfileSchema(t)),
    values: {
      aboutMe: '',
      city: '',
      country: '',
      dateOfBirth: '',
      firstName: '',
      lastName: '',
      region: '',
      userName: dataUsername,
    },
  })
  const { field: dateOfBirthField } = useController<FormFields, FieldPath<FormFields>>({
    control,
    name: 'dateOfBirth',
  })
  const { field: countryField } = useController<FormFields, FieldPath<FormFields>>({
    control,
    name: 'country',
  })
  const { field: cityField } = useController<FormFields, FieldPath<FormFields>>({
    control,
    name: 'city',
  })
  const countries = useMemo(() => {
    return Country.getAllCountries()
  }, [])

  const cities = useMemo(() => {
    return City.getCitiesOfCountry(countryField.value)
  }, [countryField.value])

  const handleDateChange = date => {
    const formattedDate = date.toISOString()

    dateOfBirthField.onChange(formattedDate)
    trigger('dateOfBirth')
  }

  const onSubmit: SubmitHandler<FormFields> = async data => {
    try {
      await setProfileInfo(data).unwrap()

      setUiAlert({
        isOpened: true,
        message: t.profileSettings.alert.success,
        type: 'success',
      })
    } catch (err) {
      console.error('setting profile failed:', err)
      setUiAlert({
        isOpened: true,
        message: t.profileSettings.alert.error,
        type: 'error',
      })
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

  return (
    <form className='flex flex-1 flex-col' onSubmit={handleSubmit(onSubmit)}>
      <Alert
        className='absolute'
        isOpened={uiAlert.isOpened}
        message={uiAlert.message}
        onClose={() => setUiAlert(prev => ({ ...prev, isOpened: false }))}
        type={uiAlert.type}
      />
      <div className='flex w-full flex-1 flex-col gap-6'>
        <Input
          errorText={errors.userName?.message}
          isRequired
          label={t.profileSettings.username}
          type='text'
          {...register('userName')}
        />
        <Input
          errorText={errors.firstName?.message}
          isRequired
          label={t.profileSettings.first_name}
          type='text'
          {...register('firstName')}
        />
        <Input
          errorText={errors.lastName?.message}
          isRequired
          label={t.profileSettings.last_name}
          type='text'
          {...register('lastName')}
        />
        <DatePicker
          errorText={
            errors.dateOfBirth && (
              <p>
                {errors.dateOfBirth?.message}{' '}
                <Link
                  className='underline'
                  href='/privacy-policy'
                  // onClick={() => sessionStorage.setItem('formData', JSON.stringify(getValues()))}
                >
                  {t.profileSettings.errors.privacy}
                </Link>
                .
              </p>
            )
          }
          label={t.profileSettings.date_of_birth}
          mode='single'
          onSelect={handleDateChange}
          selected={dateOfBirthField.value ? new Date(dateOfBirthField.value) : undefined}
          {...dateOfBirthField}
        />
        <div className='flex flex-row gap-6'>
          <Select
            className='w-1/2'
            label={t.profileSettings.select_your_country}
            onValueChange={countryField.onChange}
            options={countries.map(country => ({ label: country.name, value: country.isoCode }))}
            placeholder={t.profileSettings.country}
            value={countryField}
            {...countryField}
          />
          <Select
            className='w-1/2'
            label={t.profileSettings.select_your_city}
            onValueChange={cityField.onChange}
            options={cities?.map(city => ({
              label: city.name + [' '] + city.stateCode,
              value: city.name + [' '] + city.stateCode,
            }))}
            placeholder={t.profileSettings.city}
            value={cityField.value}
            {...cityField}
          />
        </div>
        <TextArea
          errorText={errors.aboutMe?.message}
          label={t.profileSettings.about_me}
          {...register('aboutMe', {
            onChange: async () => await trigger('aboutMe'),
          })}
        ></TextArea>
        <div className='my-6 border-b border-dark-300'></div>
        <div className='flex flex-row-reverse'>
          <Button disabled={isLoading} type='submit'>
            {t.profileSettings.save_changes}
          </Button>
        </div>
      </div>
    </form>
  )
}
