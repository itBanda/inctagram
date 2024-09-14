import { PropsWithChildren, ReactElement } from 'react'

import Link from 'next/link'

export const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className='bg-dark-700'>
      <header className='flex items-center border-b border-gray-500 px-16 py-3 text-light-100'>
        <Link className='text-2xl font-semibold' href='/'>
          Inctagram
        </Link>
        <nav className='flex-1 text-xl text-light-100'>
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
      <main className='h-[calc(100dvh_-_61px)] overflow-y-auto'>{children}</main>
    </div>
  )
}

export const getAuthLayout = (page: ReactElement) => {
  return <RootLayout>{page}</RootLayout>
}
