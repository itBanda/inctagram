import { LangSelect } from '@/components/lang-select/LangSelect'
import { useTranslation } from '@/hocs/useTranslation'
import Link from 'next/link'
import { Button } from 'uikit-inctagram'

export const AuthHeaderMenu = () => {
  const { t } = useTranslation()

  return (
    <div className='flex items-center gap-6'>
      <Button asChild variant='text'>
        <Link href='/sign-in'>{t.authPage.signIn}</Link>
      </Button>
      <Button asChild>
        <Link href='/sign-up'>{t.authPage.signUp}</Link>
      </Button>
      <LangSelect />
    </div>
  )
}