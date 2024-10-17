import { PropsWithChildren, ReactElement, ReactNode } from 'react'

import { MainHeaderMenu } from '@/components/header-menu'
import Link from 'next/link'
import { Button, Header, Icon, SideBar, Typography } from 'uikit-inctagram'
type Menu = {
  href: string
  icon: ReactNode
  label: string
}

const menu1: Menu[] = [
  {
    href: '/',
    icon: 'home-outline',
    label: 'Home',
  },
  {
    href: '#',
    icon: 'plus-square-outline',
    label: 'Create',
  },
  {
    href: '#',
    icon: 'person-outline',
    label: 'My Profile',
  },
  {
    href: '#',
    icon: 'message-circle-outline',
    label: 'Messenger',
  },
  {
    href: '#',
    icon: 'search-outline',
    label: 'Search',
  },
]
const menu2: Menu[] = [
  {
    href: '#',
    icon: 'trending-up-outline',
    label: 'Statistics',
  },
  {
    href: '#',
    icon: 'bookmark-outline',
    label: 'Favorites',
  },
]

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
        <SideBar>
          <nav className='custom-scrollbar self-s flex flex-col items-center pt-[74px] font-medium text-light-100'>
            <ul className='justify-s flex flex-col gap-6'>
              {menu1.map((el, index) => (
                <li className='transition hover:text-accent-100' key={index}>
                  <a className='flex gap-3' href={el.href}>
                    <Icon icon={el.icon} />
                    {el.label}
                  </a>
                </li>
              ))}
            </ul>
            <ul className='mt-[60px] flex flex-col gap-6 self-start'>
              {menu2.map((el, index) => (
                <li className='transition hover:text-accent-100' key={index}>
                  <a className='flex gap-3' href={el.href}>
                    <Icon icon={el.icon} />
                    {el.label}
                  </a>
                </li>
              ))}
            </ul>
            <Button
              className='mt-[180px] flex gap-3 self-start p-0 font-medium text-light-100 transition hover:text-accent-100'
              variant='text'
            >
              <Icon icon='log-out-outline' />
              Log Out
            </Button>
          </nav>
        </SideBar>
        <main className='custom-scrollbar w-full overflow-auto scrollbar-thin'>{children}</main>
      </div>
    </div>
  )
}

export const getMainLayout = (page: ReactElement) => {
  return <MainLayout>{page}</MainLayout>
}
