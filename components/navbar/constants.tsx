import { ReactNode } from 'react'

import { LocaleType } from '@/public'
import { Icon } from 'uikit-inctagram'

export type MenuItem = {
  href: string
  icon: ReactNode
  label: string
  translationId: keyof LocaleType['navbar']
}

export const menu1 = (profileId: number | undefined): MenuItem[] => [
  {
    href: '/',
    icon: <Icon icon='home-outline' />,
    label: 'Home',
    translationId: 'home',
  },
  {
    href: '/create',
    icon: <Icon icon='plus-square-outline' />,
    label: 'Create',
    translationId: 'create',
  },
  {
    href: `/profile/${profileId || ''}`,
    icon: <Icon icon='person-outline' />,
    label: 'Profile',
    translationId: 'profile',
  },
  {
    href: '/messenger',
    icon: <Icon icon='message-circle-outline' />,
    label: 'Messenger',
    translationId: 'messenger',
  },
  {
    href: '/search',
    icon: <Icon icon='search-outline' />,
    label: 'Search',
    translationId: 'search',
  },
]

export const menu2: MenuItem[] = [
  {
    href: '/statistics',
    icon: <Icon icon='trending-up-outline' />,
    label: 'Statistics',
    translationId: 'statistic',
  },
  {
    href: '/favorites',
    icon: <Icon icon='bookmark-outline' />,
    label: 'Favorites',
    translationId: 'favorites',
  },
]

export const logoutIcon = <Icon icon='log-out-outline' />
