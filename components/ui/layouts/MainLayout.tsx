import { PropsWithChildren, ReactElement } from 'react'

import { MainHeaderMenu } from '@/components/header-menu'
import Link from 'next/link'
import { Header, Typography } from 'uikit-inctagram'

export const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className='min-h-dvh bg-dark-700'>
      <Header
        className='text-light-100'
        logo={
          <Typography.TextSemiboldXl className='text-light-100'>
            <Link href='/'>Inctagram</Link>
          </Typography.TextSemiboldXl>
        }
      >
        <MainHeaderMenu />
      </Header>
      <div className='flex h-header'>
        <aside className='custom-scrollbar w-[220px] overflow-y-auto border-r border-dark-300 scrollbar-thin'>
          <nav className='text-center text-light-100'>
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
                <Link href='#'>Messenger</Link>
              </li>
            </ul>
          </nav>
        </aside>
        <main className='custom-scrollbar w-full overflow-auto scrollbar-thin'>{children}</main>
      </div>
    </div>
  )
}

export const getMainLayout = (page: ReactElement) => {
  return <MainLayout>{page}</MainLayout>
}
