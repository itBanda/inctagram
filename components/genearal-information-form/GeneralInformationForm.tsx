import { useMemo } from 'react'
import { SubmitHandler, useController, useForm } from 'react-hook-form'

import { useTranslation } from '@/hooks/useTranslation'
import { profileApi } from '@/services'
import { City, Country } from 'country-state-city'
import { Button, DatePicker, Input, TextArea } from 'uikit-inctagram'
import { z } from 'zod'

const GeneralInformationSchema = z.object({
  aboutMe: z.string(),
  city: z.string(),
  country: z.string(),
  dateOfBirth: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  userName: z.string(),
})

type FormFields = z.infer<typeof GeneralInformationSchema>

export const GeneralInformationForm = () => {
  const { data: profileData } = profileApi.useGetProfileQuery()
  const [updateProfile, { isLoading }] = profileApi.useUpdateProfileMutation()
  const { control, formState, handleSubmit, register, watch } = useForm<FormFields>({
    mode: 'onBlur',
    values: {
      aboutMe: '',
      city: '',
      country: '',
      dateOfBirth: '',
      firstName: '',
      lastName: '',
      userName: profileData?.userName || '',
    },
  })

  const { t } = useTranslation()

  const { field: cityField } = useController<FormFields>({ control, name: 'city' })
  const { field: countryField } = useController<FormFields>({ control, name: 'country' })
  const { field: dateOfBirthField } = useController<FormFields>({ control, name: 'dateOfBirth' })

  const countries = useMemo(() => {
    return Country.getAllCountries()
  }, [])

  const cities = useMemo(() => {
    return City.getCitiesOfCountry(countryField.value)
  }, [countryField.value])

  console.log('cities', cities)

  console.log('countries', countries)
  // console.log(dateOfBirthField)

  const onSubmit: SubmitHandler<FormFields> = async values => {
    try {
      await updateProfile(values)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <form className='flex w-full flex-col gap-6' onSubmit={handleSubmit(onSubmit)}>
      <Input isRequired label='Username' {...register('userName')} />
      <Input isRequired label='First Name' {...register('firstName')} />
      <Input isRequired label='Last Name' {...register('lastName')} />
      <DatePicker
        captionLayout='dropdown'
        label={t.profile.button.profileSettings}
        mode='single'
        onSelect={date => dateOfBirthField.onChange(date?.toString())}
        selected={dateOfBirthField.value ? new Date(dateOfBirthField.value) : undefined}
        {...dateOfBirthField}
      />
      <div className='flex gap-6'>
        {/* <Select
          label='Select your country'
          onValueChange={countryField.onChange}
          options={countries.map(country => ({
            label: country.name,
            value: country.isoCode,
          }))}
          placeholder='Choose country'
          {...countryField}
        /> */}

        <select className='w-full' {...countryField}>
          <option disabled value=''>
            Select
          </option>
          {countries?.map(country => (
            <option key={country.isoCode} value={country.isoCode}>
              {country.name}
            </option>
          ))}
        </select>

        <select className='w-full' {...cityField}>
          <option disabled value=''>
            Select
          </option>
          {cities?.map(city => (
            <option key={city.name + city.stateCode} value={city.name}>
              {city.name}
            </option>
          ))}
        </select>
        {/* <Select
          label='Select your city'
          onValueChange={cityField.onChange}
          options={
            cities?.map(city => ({
              label: city.name,
              value: city.name + city.stateCode,
            })) || []
          }
          placeholder='Choose city'
          {...cityField}
        /> */}
      </div>
      <TextArea label='About me' {...register('aboutMe')} />
      <div className='h-[1px] bg-dark-300' />
      <Button className='self-end' disabled={isLoading}>
        Save Changes
      </Button>
    </form>
  )
}
