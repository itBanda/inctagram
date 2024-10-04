import { PropsWithChildren, ReactElement } from 'react'

import { AuthHeaderMenu } from '@/components/header-menu'
import Link from 'next/link'
import { Header, Typography } from 'uikit-inctagram'

export const AuthLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className='min-h-dvh bg-dark-700'>
      <Header
        className='text-light-100'
        logo={
          <Typography.TextSemiboldXl className='text-light-100'>
            <Link href='/sign-in'>Inctagram</Link>
          </Typography.TextSemiboldXl>
        }
      >
        <AuthHeaderMenu />
      </Header>
      <main className='custom-scrollbar h-header overflow-y-auto scrollbar-thin'>{children}</main>
    </div>
  )
}

export const getAuthLayout = (page: ReactElement) => {
  return <AuthLayout>{page}</AuthLayout>
}
