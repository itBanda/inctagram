import { PropsWithChildren, ReactElement } from 'react'

import Link from 'next/link'

export const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className='min-h-screen bg-gray-800'>
      <header className='flex items-center border-b border-gray-500 px-16 py-3'>
        <Link className='text-2xl font-semibold text-white' href='/'>
          Inctagram
        </Link>
        <nav className='flex-1 text-xl text-gray-300'>
          <ul className='flex gap-3'>
            <li className='ml-auto'>
              <Link href='/profile'>Profile</Link>
            </li>
            <li className='ml-auto'>
              <Link href='/sign-up'>Sign up</Link>
            </li>
            <li>
              <Link href='/sign-in'>Sign in</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>{children}</main>
    </div>
  )
}

export const getAuthLayout = (page: ReactElement) => {
  return <RootLayout>{page}</RootLayout>
}
