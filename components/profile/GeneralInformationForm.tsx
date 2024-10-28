import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

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
  const isBrowser = typeof window !== 'undefined'
  const [country, setCountry] = useState(isBrowser ? sessionStorage.getItem('selectedCity') : '')
  const [city, setCity] = useState(isBrowser ? sessionStorage.getItem('selectedCity') : '')
  const [cityOptions, setCityOptions] = useState([])
  const [dateOfBirth, setDateOfBirth] = useState(
    isBrowser ? sessionStorage.getItem('dateOfBirth') : ''
  )
  const [uiAlert, setUiAlert] = useState({
    isOpened: false,
    message: '',
    type: 'success' as 'error' | 'success' | 'warning',
  })

  const {
    formState: { errors, isSuccess },
    getValues,
    handleSubmit,
    register,
    setError,
    setValue,
    trigger,
  } = useForm<FormFields>({
    defaultValues: {
      aboutMe: '',
      city: '',
      country: '',
      dateOfBirth: '',
      firstName: '',
      lastName: '',
      region: '',
      userName: '',
    },
    mode: 'onBlur',
    resolver: zodResolver(ProfileSchema(t)),
  })
  const handleDateChange = date => {
    const formattedDate = date.toISOString()

    setDateOfBirth(formattedDate)
    setValue('dateOfBirth', formattedDate)

    sessionStorage.setItem('dateOfBirth', formattedDate)
    trigger('dateOfBirth')
  }
  const updateCityOptions = selectedCountry => {
    const cities = City.getCitiesOfCountry(selectedCountry)
    const options = cities?.map(city => ({
      label: city.name + city.stateCode,
      value: city.name + city.stateCode,
    }))

    setCityOptions(options || [])
  }
  const handleCountryChange = selectedCountry => {
    setCountry(selectedCountry)
    sessionStorage.setItem('selectedCountry', selectedCountry)
    updateCityOptions(selectedCountry)
    setValue('country', country)
  }

  const handleCityChange = selectedCity => {
    setCity(selectedCity)
    sessionStorage.setItem('selectedCity', selectedCity)
    setValue('city', city)
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

  useEffect(() => {
    if (dataUsername) {
      setValue('userName', dataUsername)
    }
    const savedData = sessionStorage.getItem('formData')

    if (savedData) {
      const parsedData = JSON.parse(savedData)

      Object.keys(parsedData).forEach(key => setValue(key, parsedData[key]))
    }
  }, [dataUsername, setValue])
  useEffect(() => {
    const storedCountry = sessionStorage.getItem('selectedCountry')
    const storedCity = sessionStorage.getItem('selectedCity')
    const storedDateOfBirth = sessionStorage.getItem('dateOfBirth')

    setDateOfBirth(storedDateOfBirth)
    setCountry(storedCountry)
    updateCityOptions(storedCountry)
    setCity(storedCity)
  }, [])

  return (
    <div className='flex w-full flex-col'>
      <Alert
        className='absolute'
        isOpened={uiAlert.isOpened}
        message={uiAlert.message}
        onClose={() => setUiAlert(prev => ({ ...prev, isOpened: false }))}
        type={uiAlert.type}
      />
      <form className='flex flex-1 flex-col' onSubmit={handleSubmit(onSubmit)}>
        <div className='mt-6 flex w-full flex-1 flex-col gap-6'>
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
            label={t.profileSettings.date_of_birth}
            mode='single'
            onSelect={handleDateChange}
            selected={dateOfBirth}
            {...register('dateOfBirth')}
            errorText={
              errors.dateOfBirth && (
                <p>
                  {errors.dateOfBirth?.message}{' '}
                  <Link
                    className='underline'
                    href='/privacy-policy'
                    onClick={() => sessionStorage.setItem('formData', JSON.stringify(getValues()))}
                  >
                    {t.profileSettings.errors.privacy}
                  </Link>
                  .
                </p>
              )
            }
          />
          <div className='flex flex-row gap-6'>
            <Select
              className='w-1/2'
              label={t.profileSettings.select_your_country}
              onValueChange={handleCountryChange}
              options={Country.getAllCountries().map(country => ({
                label: country.name,
                value: country.isoCode,
              }))}
              placeholder={t.profileSettings.country}
              value={country}
            />
            <Select
              className='w-1/2'
              label={t.profileSettings.select_your_city}
              onValueChange={handleCityChange}
              options={cityOptions}
              placeholder={t.profileSettings.city}
              value={city}
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
    </div>
  )
}
