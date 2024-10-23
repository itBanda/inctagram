import { MenuItem } from '@/components/navbar/Navbar'
import { Icon } from 'uikit-inctagram'

export const menu1: MenuItem[] = [
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
    href: '/profile',
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
