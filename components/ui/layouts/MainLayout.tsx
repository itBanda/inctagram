import { PropsWithChildren, ReactElement } from 'react'

import Link from 'next/link'
import { Header, Typography } from 'uikit-inctagram'

import { HeaderMenu } from '../../header-menu/HeaderMenu'

export const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className='min-h-screen bg-dark-700'>
      <Header
        className='text-light-100'
        logo={
          <Typography.TextSemiboldXl className='text-light-100'>
            <Link href='/'>Inctagram</Link>
          </Typography.TextSemiboldXl>
        }
      >
        <HeaderMenu />
      </Header>
      <div className='flex h-header'>
        <aside className='w-[220px] overflow-auto border-r border-gray-500'>
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
                <Link href='#'>Mesenger</Link>
              </li>
            </ul>
          </nav>
        </aside>

        <main className='w-full overflow-auto'>{children}</main>
      </div>
    </div>
  )
}

export const getMainLayout = (page: ReactElement) => {
  return <MainLayout>{page}</MainLayout>
}
