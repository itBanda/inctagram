import En from '@/assets/lang-img/FlagEn.png'
import Ru from '@/assets/lang-img/FlagRu.png'
import { useTranslation } from '@/hooks/useTranslation'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Select } from 'uikit-inctagram'

export const LangSelect = () => {
  const { asPath, locale, pathname, push, query } = useRouter()
  const { t } = useTranslation()

  const changeLangHandler = (value: string) => {
    push({ pathname, query }, asPath, { locale: value })
  }

  return (
    <Select
      id='language-select'
      onValueChange={changeLangHandler}
      options={[
        { icon: <Image alt='Russian Language' src={Ru} />, label: t.header.ru, value: 'ru' },
        { icon: <Image alt='English Language' src={En} />, label: t.header.en, value: 'en' },
      ]}
      // placeholder={locale === 'en' ? t.header.en : t.header.ru}
      value={locale}
    />
  )
}
