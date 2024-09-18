import Link from 'next/link'
import { Button } from 'uikit-inctagram'

import { authActions, authSelectors } from '../../features'
import { useAppDispatch, useAppSelector } from '../../store'

export const HeaderMenu = () => {
  const isLoggedIn = useAppSelector(authSelectors.selectIsLoggedIn)
  const dispatch = useAppDispatch()

  const handleLogout = () => {
    dispatch(authActions.logout())
  }

  return (
    <div className='flex items-center gap-6'>
      {isLoggedIn ? (
        <Button asChild onClick={handleLogout} variant='text'>
          <Link href='/sign-in'>Logout</Link>
        </Button>
      ) : (
        <>
          <Button asChild variant='text'>
            <Link href='/sign-in'>Sign in</Link>
          </Button>
          <Button asChild>
            <Link href='/sign-up'>Sign up</Link>
          </Button>
        </>
      )}
    </div>
  )
}
