import { ChangeEvent } from 'react'

import En from '@/assets/lang-img/FlagEn.svg'
import Ru from '@/assets/lang-img/FlagRu.svg'
import { useTranslation } from '@/hocs/useTranslation'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Select } from 'uikit-inctagram'

export const LangSelect = () => {
  const { asPath, locale, pathname, push, query } = useRouter()
  const { t } = useTranslation()

  // const changeLangHandler = (event: ChangeEvent<HTMLSelectElement>) => {
  //   const locale = event.currentTarget.value
  //
  //   push({ pathname, query }, asPath, { locale })
  // }

  const changeLangHandler = (value: string) => {
    //const locale = event.currentTarget.value
    console.log('Выбранный язык:', value)
    push({ pathname, query }, asPath, { locale: value })
  }

  return (
    <Select
      id='language-select'
      onValueChange={() => console.log('Текущий язык:', locale)}
      options={[
        { icon: <Image alt='Russian Language' src={Ru} />, label: t.header.en, value: 'en' },
        { icon: <Image alt='English Language' src={En} />, label: t.header.ru, value: 'ru' },
      ]}
      value={locale}
    />
    // <select onChange={changeLangHandler} value={locale}>
    //   <option value='ru'>{t.header.ru}</option>
    //   <option value='en'>{t.header.en}</option>
    // </select>
  )
}
