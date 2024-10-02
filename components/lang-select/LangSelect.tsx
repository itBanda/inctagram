import { ChangeEvent } from 'react'

import { useTranslation } from '@/hocs/useTranslation'
import { useRouter } from 'next/router'
import { Select } from 'uikit-inctagram'

export const LangSelect = () => {
  const { asPath, locale, pathname, push, query } = useRouter()
  const { t } = useTranslation()

  const changeLangHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    const locale = event.currentTarget.value

    push({ pathname, query }, asPath, { locale })
  }

  return (
    // <Select
    //   defaultValue={locale}
    //   id='language-select'
    //   onValueChange={changeLangHandler}
    //   options={[
    //     { label: t.header.en, value: 'en' },
    //     { label: t.header.ru, value: 'ru' },
    //   ]}
    // />
    <select defaultValue={locale} onChange={changeLangHandler}>
      <option value='ru'>{t.header.ru}</option>
      <option value='en'>{t.header.en}</option>
    </select>
  )
}
