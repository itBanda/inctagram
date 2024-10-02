import { LangSelect } from '@/components/lang-select/LangSelect'
import { useTranslation } from '@/hocs/useTranslation'
import Link from 'next/link'
import { Button, Checkbox, Icon, Select } from 'uikit-inctagram'

import { authActions, authSelectors } from '../../features'
import { useAppDispatch, useAppSelector } from '../../store'

export const HeaderMenu = () => {
  const isLoggedIn = useAppSelector(authSelectors.selectIsLoggedIn)
  const dispatch = useAppDispatch()
  const { t } = useTranslation()

  const handleLogout = () => {
    dispatch(authActions.logout())
  }

  return (
    <div className='flex items-center gap-6'>
      {isLoggedIn ? (
        <Button asChild onClick={handleLogout} variant='text'>
          <Link href='/sign-in'>{t.header.logout}</Link>
        </Button>
      ) : (
        <>
          <Button asChild variant='text'>
            <Link href='/sign-in'>{t.authPage.signIn}</Link>
          </Button>
          <Button asChild>
            <Link href='/sign-up'>{t.authPage.signUp}</Link>
          </Button>
          <LangSelect />
        </>
      )}
    </div>
  )
}
