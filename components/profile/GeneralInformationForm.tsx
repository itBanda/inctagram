import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { authApi } from '@/services'
import { zodResolver } from '@hookform/resolvers/zod'
import { getCode, getNames } from 'country-list'
import { City, Country } from 'country-state-city'
import { Button, Card, Icon, Input, Select } from 'uikit-inctagram'
import { z } from 'zod'

const Schema = z.object({
  firstName: z.string().nonempty('Name is required'),
  secondName: z.string().nonempty('Name is required'),
  userName: z
    .string()
    .trim()
    .regex(/^[A-Za-z0-9_-]+$/, 'Username can contain 0-9; A-Z; a-z; _ ; - ')
    .min(6, 'Minimum numbers of characters 6')
    .max(30, 'Maximum numbers of characters 30'),
})

type FormFields = z.infer<ReturnType<typeof Schema>>

export const GeneralInformationForm = () => {
  const { data } = authApi.useAuthMeQuery()
  const dataUsername = data?.userName

  const countries = Country.getAllCountries()

  const [selectedCountry, setSelectedCountry] = useState('')
  const [cities, setCities] = useState<Array<any> | undefined>([])

  const handleCountryChange = countryIsoCode => {
    setSelectedCountry(countryIsoCode)
    const citiesOfCountry = City.getCitiesOfCountry(countryIsoCode)

    setCities(citiesOfCountry)
  }

  console.log(getNames())
  const {
    formState: { errors, isRequired },
    register,
    setValue,
  } = useForm<FormFields>({
    defaultValues: {
      firstName: '',
      lastName: '',
      userName: '',
    },
    mode: 'onBlur',
    resolver: zodResolver(Schema),
  })

  console.log(errors)

  useEffect(() => {
    if (dataUsername) {
      setValue('userName', dataUsername)
    }
  }, [dataUsername, setValue])

  return (
    <form>
      <div className='mx-6 flex gap-4'>
        <div className='flex flex-col'>
          <Card className='m-4 h-48 w-48 rounded-full bg-dark-300'>
            {/*<Icon icon={}/>*/}
            {/*photo*/}
          </Card>
          <Button type='secondary'>Add a Profile Photo</Button>
        </div>
        <div className='m-4 flex flex-1 flex-col border-2 border-danger-100'>
          <Input
            errorText={errors.userName?.message}
            label='Username'
            type='text'
            {...register('userName')}
          />
          <Input label='First Name' type='text' />
          <Input label='Last Name' type='text' />
          <Input label='Date of birth' type='text' />
          <div className='flex flex-row gap-8'>
            <Select
              className='w-1/2'
              label='Select your country'
              onValueChange={handleCountryChange}
              options={countries.map(country => ({
                label: country.name,
                value: country.isoCode,
              }))}
              placeholder='Country'
            />
            <Select
              className='w-1/2'
              label='Select your city'
              options={cities?.map(city => ({
                label: city.name,
                value: city.isoCode,
              }))}
              placeholder='City'
            />
          </div>
        </div>
      </div>
      <div className='mb-2 flex flex-col gap-6'></div>
    </form>
  )
}
