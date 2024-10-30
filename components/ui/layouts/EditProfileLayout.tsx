import { ReactElement } from 'react'

import { MainHeaderMenu } from '@/components/header-menu'
import { useTranslation } from '@/hooks/useTranslation'
import Index from '@/pages/profile/settings'
import Link from 'next/link'
import { Header, Tabs, Typography } from 'uikit-inctagram'

export const EditProfileLayout = () => {
  const { t } = useTranslation()

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
        <main className='custom-scrollbar flex w-full justify-start overflow-auto scrollbar-thin'>
          <div className='m-6 w-full max-w-[972px]'>
            <Tabs
              tabsData={[
                { content: <Index />, title: t.tabs.generalInfo, value: 'tab1' },
                { content: ' ', title: t.tabs.devices, value: 'tab2' },
                { content: ' ', title: t.tabs.account_management, value: 'tab3' },
                { content: ' ', title: t.tabs.payments, value: 'tab4' },
              ]}
            ></Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}

export const getEditProfileLayout = (page: ReactElement) => {
  return <EditProfileLayout>{page}</EditProfileLayout>
}
