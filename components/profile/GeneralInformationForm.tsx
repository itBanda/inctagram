import { useEffect, useMemo, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { authApi, isApiError, isFetchBaseQueryError } from '@/services'
import { profileApi } from '@/services/profile/profileSlice'
import { zodResolver } from '@hookform/resolvers/zod'
import { City, Country } from 'country-state-city'
import { parse } from 'date-fns'
import Link from 'next/link'
import { Alert, Button, DatePicker, Input, Select, TextArea } from 'uikit-inctagram'
import { z } from 'zod'

const today = new Date()
const minimumAge = 13
const minimumDate = new Date(today.getFullYear() - minimumAge, today.getMonth(), today.getDate())

const ProfileSchema = z
  .object({
    aboutMe: z
      .string()
      .trim()
      .max(200, 'maximum numbers of symbols 200')
      .regex(
        /^[a-zA-Z0-9А-Яа-я\d!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~ ]*$/,
        'maximum numbers of symbols 200'
      ),
    city: z.string(),
    country: z.string(),
    dateOfBirth: z.string(),
    firstName: z
      .string()
      .trim()
      .min(1, 'mandatory')
      .max(50)
      .regex(/^[a-zA-ZА-Яа-я]*$/, 'can contain only letters'),
    lastName: z
      .string()
      .trim()
      .min(1, 'mandatory')
      .max(50)
      .regex(/^[a-zA-ZА-Яа-я]*$/, 'can contain only letters'),
    region: z.string(),
    userName: z
      .string()
      .trim()
      .min(1, 'mandatory')
      .min(6, 'Minimum numbers of characters 6')
      .max(30, 'Maximum numbers of characters 30')
      .regex(/^[A-Za-z0-9_-]+$/, 'Username can contain 0-9; A-Z; a-z; _ ; - '),
  })
  .refine(
    data => {
      const date = parse(data.dateOfBirth, 'dd/MM/yyyy', new Date())

      return date < minimumDate
    },
    {
      message: `A user under 13 cannot create a profile `,
      path: ['dateOfBirth'],
    }
  )

type FormFields = z.infer<typeof ProfileSchema>

export const GeneralInformationForm = () => {
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
    resolver: zodResolver(ProfileSchema),
  })
  const handleDateChange = date => {
    setDateOfBirth(date)
    sessionStorage.setItem('dateOfBirth', date.toISOString())
    trigger('dateOfBirth')
  }

  const onSubmit: SubmitHandler<FormFields> = async data => {
    try {
      await setProfileInfo(data).unwrap()

      setUiAlert({
        isOpened: true,
        message: 'Your settings are saved!',
        type: 'success',
      })
    } catch (err) {
      alert('failed')
      console.error('setting profile failed:', err)
      setUiAlert({
        isOpened: true,
        message: 'Error! Server is not available!',
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
  }

  const handleCityChange = selectedCity => {
    setCity(selectedCity)
    sessionStorage.setItem('selectedCity', selectedCity)
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
            label='Username'
            type='text'
            {...register('userName')}
          />
          <Input
            errorText={errors.firstName?.message}
            isRequired
            label='First Name'
            type='text'
            {...register('firstName')}
          />
          <Input
            errorText={errors.lastName?.message}
            isRequired
            label='Last Name'
            type='text'
            {...register('lastName')}
          />
          <DatePicker
            label='Date of birth'
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
                    Privacy Policy
                  </Link>
                  .
                </p>
              )
            }
          />
          <div className='flex flex-row gap-6'>
            <Select
              className='w-1/2'
              label='Select your country'
              onValueChange={handleCountryChange}
              options={Country.getAllCountries().map(country => ({
                label: country.name,
                value: country.isoCode,
              }))}
              placeholder='country'
              value={country}
            />
            <Select
              className='w-1/2'
              label='Select your city'
              onValueChange={handleCityChange}
              options={cityOptions}
              placeholder='City'
              value={city}
            />
          </div>
          <TextArea
            errorText={errors.aboutMe?.message}
            label='About me'
            {...register('aboutMe', {
              onChange: async () => await trigger('aboutMe'),
            })}
          ></TextArea>
          <div className='my-6 border-b border-dark-300'></div>
          <div className='flex flex-row-reverse'>
            <Button disabled={isLoading} type='submit'>
              Submit
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}
