import { ComponentProps, ReactNode, startTransition, useState } from 'react'

import { ConfirmationModal } from '@/components'
import { authActions } from '@/features'
import { useTranslation } from '@/hooks/useTranslation'
import { authApi } from '@/services'
import { useAppDispatch } from '@/store'
import Link from 'next/link'
import { Button, Icon, SideBar, Typography } from 'uikit-inctagram'

type Menu = {
  href: string
  icon: ReactNode
  label: string
}
type Props = ComponentProps<'aside'>

export const Navbar = ({ className }: Props) => {
  const { t } = useTranslation()
  const { data } = authApi.useAuthMeQuery()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const dispatch = useAppDispatch()
  const [logout, { isLoading: isLogoutLoading }] = authApi.useLogoutMutation()

  const handleOpenModal = () => setIsModalOpen(true)
  const handleCloseModal = () => setIsModalOpen(false)

  const handleLogout = () => {
    startTransition(() => {
      logout()
        .unwrap()
        .then(() => {
          dispatch(authActions.logout())
        })
        .catch(err => {
          console.warn(err)
        })
    })
  }

  const menu1: Menu[] = [
    {
      href: '/',
      icon: <Icon icon='home-outline' />,
      label: t.navbar.home,
    },
    {
      href: '#',
      icon: <Icon icon='plus-square-outline' />,
      label: t.navbar.create,
    },
    {
      href: '#',
      icon: <Icon icon='person-outline' />,
      label: t.navbar.profile,
    },
    {
      href: '#',
      icon: <Icon icon='message-circle-outline' />,
      label: t.navbar.messenger,
    },
    {
      href: '#',
      icon: <Icon icon='search-outline' />,
      label: t.navbar.search,
    },
  ]

  const menu2: Menu[] = [
    {
      href: '#',
      icon: <Icon icon='trending-up-outline' />,
      label: t.navbar.statistic,
    },
    {
      href: '#',
      icon: <Icon icon='bookmark-outline' />,
      label: t.navbar.favorites,
    },
  ]

  return (
    <SideBar className={className}>
      <ConfirmationModal
        body={
          <Typography.TextBase className='text-light-100'>
            {t.header.logoutConfirmation(data?.email)}
          </Typography.TextBase>
        }
        isLoading={isLogoutLoading}
        isOpened={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleLogout}
        title='Confirm logout'
      />
      <nav className='custom-scrollbar flex h-full flex-col items-center pt-[74px] font-medium text-light-100'>
        <ul className='justify-s flex flex-col gap-6'>
          {menu1.map((el, index) => (
            <li className='transition hover:text-accent-100' key={index}>
              <Link className='flex gap-3' href={el.href}>
                {el.icon}
                {el.label}
              </Link>
            </li>
          ))}
        </ul>
        <ul className='mt-[60px] flex flex-col gap-6 self-start'>
          {menu2.map((el, index) => (
            <li className='transition hover:text-accent-100' key={index}>
              <Link className='flex gap-3' href={el.href}>
                {el.icon}
                {el.label}
              </Link>
            </li>
          ))}
        </ul>
        <Button
          className='mt-[180px] flex gap-3 self-start p-0 font-medium text-light-100 transition hover:text-accent-100'
          onClick={handleOpenModal}
          variant='text'
        >
          <Icon icon='log-out-outline' />
          {t.navbar.button.logOut}
        </Button>
      </nav>
    </SideBar>
  )
}
