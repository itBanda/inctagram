import Link from 'next/link'
import { Button } from 'uikit-inctagram'

export const AuthHeaderMenu = () => {
  return (
    <div className='flex items-center gap-6'>
      <Button asChild variant='text'>
        <Link href='/sign-in'>Sign in</Link>
      </Button>
      <Button asChild>
        <Link href='/sign-up'>Sign up</Link>
      </Button>
    </div>
  )
}
