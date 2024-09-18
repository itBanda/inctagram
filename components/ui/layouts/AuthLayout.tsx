import { PropsWithChildren, ReactElement } from 'react'

import Link from 'next/link'
import { Header, Typography } from 'uikit-inctagram'

import { HeaderMenu } from '../../header-menu/HeaderMenu'

export const AuthLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className='min-h-screen bg-gray-800'>
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
      <main>{children}</main>
    </div>
  )
}

export const getAuthLayout = (page: ReactElement) => {
  return <AuthLayout>{page}</AuthLayout>
}
