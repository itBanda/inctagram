import { PropsWithChildren, ReactElement } from 'react'

import Link from 'next/link'

export const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className='min-h-screen bg-gray-800'>
      <header className='flex flex-1 items-center border-b border-gray-500 px-16 py-3'>
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
      <div className='flex h-[calc(100vh_-_57px)]'>
        <aside className='w-[220px] border-r border-gray-500'>
          <nav className='text-center text-white'>
            <ul>
              <li>
                <Link href='#'>Home</Link>
              </li>
              <li>
                <Link href='#'>Create</Link>
              </li>
              <li>
                <Link href='#'>My Profile</Link>
              </li>
              <li>
                <Link href='#'>Mesenger</Link>
              </li>
            </ul>
          </nav>
        </aside>

        <main className='w-full'>{children}</main>
      </div>
    </div>
  )
}

export const getMainLayout = (page: ReactElement) => {
  return <MainLayout>{page}</MainLayout>
}
