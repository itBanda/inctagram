import { ChangeEvent } from 'react'

import { useTranslation } from '@/hocs/useTranslation'
import { useRouter } from 'next/router'

export const LangSelect = () => {
  //const router = useRouter()
  const { asPath, locale, pathname, push, query } = useRouter()
  const { t } = useTranslation()

  const changeLangHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    const locale = event.currentTarget.value

    push({ pathname, query }, asPath, { locale })
  }

  return (
    <select defaultValue={locale} onChange={changeLangHandler}>
      <option value='ru'>{t.header.ru}</option>
      <option value='en'>{t.header.en}</option>
    </select>
  )
  // {/*<Select*/}
  // {/*  id='language-select'*/}
  // {/*  options={[*/}
  // {/*    {*/}
  // {/*      icon: <Icon className='inline' icon='paypal' />,*/}
  // {/*      label: 'Option 1',*/}
  // {/*      value: 'option1',*/}
  // {/*    },*/}
  // {/*    { label: 'Option 2', value: 'option2' },*/}
  // {/*    { label: 'Option 3', value: 'option3' },*/}
  // {/*  ]}*/}
  // {/*/>*/}
}
