import { ReactElement } from 'react'

import { MainHeaderMenu } from '@/components/header-menu'
import GeneralInformation from '@/pages/general-information'
import Link from 'next/link'
import { Header, Tabs, Typography } from 'uikit-inctagram'

export const EditProfileLayout = () => {
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
        <main className='custom-scrollbar ml-6 mt-6 flex w-full justify-start overflow-auto scrollbar-thin'>
          {/*<div className='ml-6 mt-6 flex justify-start'>*/}
          <Tabs
            tabsData={[
              { content: <GeneralInformation />, title: 'General information', value: 'tab1' },
              { content: ' ', title: 'Devices', value: 'tab2' },
              { content: ' ', title: 'Account management', value: 'tab3' },
              { content: ' ', title: 'Payments', value: 'tab4' },
            ]}
          ></Tabs>
          {/*</div>*/}
        </main>
      </div>
    </div>
  )
}

export const getEditProfileLayout = (page: ReactElement) => {
  return <EditProfileLayout>{page}</EditProfileLayout>
}
