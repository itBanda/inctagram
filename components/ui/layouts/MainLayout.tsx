import { PropsWithChildren, ReactElement } from 'react'

import { Navbar } from '@/components'
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
      <div className='mx-auto max-w-[1280px]'>
        <div className='flex'>
          <Navbar />
          <main className='custom-scrollbar w-full overflow-auto scrollbar-thin'>{children}</main>
        </div>
      </div>
    </div>
  )
}

export const getMainLayout = (page: ReactElement) => {
  return <MainLayout>{page}</MainLayout>
}
