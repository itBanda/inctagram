import { authActions } from '@/features'
import { useAppDispatch } from '@/store'
import Link from 'next/link'
import { Button } from 'uikit-inctagram'

export const MainHeaderMenu = () => {
  const dispatch = useAppDispatch()

  const handleLogout = () => {
    dispatch(authActions.logout())
  }

  return (
    <div className='flex items-center gap-6'>
      <Button asChild onClick={handleLogout} variant='text'>
        <Link href='/sign-in'>Logout</Link>
      </Button>
    </div>
  )
}
