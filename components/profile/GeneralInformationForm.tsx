import { useEffect, useMemo, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import { authApi, isApiError, isFetchBaseQueryError } from '@/services'
import { profileApi } from '@/services/profile/profileSlice'
import { zodResolver } from '@hookform/resolvers/zod'
import { City, Country } from 'country-state-city'
import { parse } from 'date-fns'
import debounce from 'lodash.debounce'
import Link from 'next/link'
import { useRouter } from 'next/router'
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

  const [selectedCountry, setSelectedCountry] = useState('')
  const [date, setDate] = useState<Date>()
  const [uiAlert, setUiAlert] = useState({
    isOpened: false,
    message: '',
    type: 'success' as 'error' | 'success' | 'warning',
  })
  const router = useRouter()

  const cities = useMemo(() => {
    const citiesList = selectedCountry ? City.getCitiesOfCountry(selectedCountry) : []

    console.log(citiesList)

    return citiesList
  }, [selectedCountry])
  const countries = useMemo(() => Country.getAllCountries(), [])
  const {
    control,
    formState: { errors, isSuccess },
    getValues,
    handleSubmit,
    register,
    reset,
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
    setDate(date)
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

  useEffect(() => {
    if (dataUsername) {
      setValue('userName', dataUsername)
    }
    if (router.query.data) {
      const savedData = JSON.parse(router.query.data)

      reset(savedData)
      if (savedData.country) {
        setSelectedCountry(savedData.country)
      }
      if (savedData.city) {
        setValue('city', savedData.city)
      }
    }
  }, [dataUsername, reset, router.query, setValue])

  return (
    <section className='flex flex-col items-center'>
      <Alert
        className='absolute'
        isOpened={uiAlert.isOpened}
        message={uiAlert.message}
        onClose={() => setUiAlert(prev => ({ ...prev, isOpened: false }))}
        type={uiAlert.type}
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='mt-6 flex w-[740px] flex-1 flex-col gap-6'>
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
            selected={date}
            {...register('dateOfBirth')}
            errorText={
              errors.dateOfBirth && (
                <p>
                  {errors.dateOfBirth.message}{' '}
                  <Link
                    className='underline'
                    href={{
                      pathname: '/privacy-policy',
                      query: { data: JSON.stringify(getValues()) },
                    }}
                  >
                    Privacy Policy
                  </Link>
                  .
                </p>
              )
            }
          />
          <div className='flex flex-row gap-6'>
            <Controller
              control={control}
              name='country'
              render={({ field }) => (
                <Select
                  className='w-1/2'
                  label='Select your country'
                  onValueChange={value => {
                    field.onChange(value)
                    setSelectedCountry(value)
                    setValue('city', '')
                  }}
                  options={countries.map(country => ({
                    label: country.name,
                    value: country.isoCode,
                  }))}
                  placeholder='Country'
                  value={selectedCountry}
                />
              )}
            />
            <Controller
              control={control}
              name='city'
              render={({ field }) => (
                <Select
                  className='w-1/2'
                  label='Select your city'
                  onValueChange={value => {
                    field.onChange(value)
                    setValue('city', value)
                  }}
                  options={cities?.map((city, index) => ({
                    label: city.name,
                    value: city.name,
                  }))}
                  placeholder='City'
                  value={field.value}
                />
              )}
            />
          </div>
          <TextArea
            errorText={errors.aboutMe?.message}
            label='About me'
            {...register('aboutMe', {
              onChange: async () => await trigger('aboutMe'),
            })}
          ></TextArea>
        </div>
        <div className='my-6 border-b border-dark-300'></div>
        <div className='flex flex-row-reverse'>
          <Button disabled={isLoading} type='submit'>
            Submit
          </Button>
        </div>
      </form>
    </section>
  )
}
