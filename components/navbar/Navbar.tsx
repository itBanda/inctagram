import { ReactNode, useState } from 'react'

import { ConfirmationModal } from '@/components/modals'
import { logoutIcon, menu1, menu2 } from '@/components/navbar/constans'
import { authActions } from '@/features'
import { useTranslation } from '@/hooks/useTranslation'
import { LocaleType } from '@/public'
import { authApi } from '@/services'
import { useAppDispatch } from '@/store'
import Link from 'next/link'
import { Button, SideBar, Typography } from 'uikit-inctagram'

export type MenuItem = {
  href: string
  icon: ReactNode
  label: string
  translationId: keyof LocaleType['navbar']
}

const getMenuItemsWithTranslation = (menuItems: MenuItem[], locale: LocaleType) => {
  return menuItems.map(menuItem => ({
    ...menuItem,
    label: locale.navbar[menuItem.translationId],
  }))
}

export const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const dispatch = useAppDispatch()
  const { data } = authApi.useAuthMeQuery()
  const [logout, { isLoading: isLogoutLoading }] = authApi.useLogoutMutation()
  const { t } = useTranslation()

  const handleOpenModal = () => setIsModalOpen(true)
  const handleCloseModal = () => setIsModalOpen(false)
  const handleLogout = () => {
    logout()
      .unwrap()
      .then(() => {
        dispatch(authActions.logout())
      })
      .catch(err => {
        console.error(err)
      })
  }

  const renderMenuItems = (menuItems: MenuItem[]) => {
    const translatedMenuItems = getMenuItemsWithTranslation(menuItems, t)

    return translatedMenuItems.map(menuItem => (
      <li className='text-light-100' key={menuItem.label}>
        <Link
          className='flex items-center gap-3 outline-none transition hover:text-accent-100 focus:ring-2 focus:ring-accent-700 active:text-accent-700'
          href={menuItem.href}
        >
          <span>{menuItem.icon}</span>
          <span>{menuItem.label}</span>
        </Link>
      </li>
    ))
  }

  return (
    <>
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
      <SideBar className='h-full flex-col items-center justify-start pb-9 pt-[72px]'>
        <nav className='flex h-full flex-col'>
          <ul className='flex flex-col gap-6'>{renderMenuItems(menu1)}</ul>
          <ul className='mt-[60px] flex flex-col gap-6'>{renderMenuItems(menu2)}</ul>
          <Button
            className='mt-auto flex items-center gap-3 p-0 font-medium text-light-100' // Добавьте временный фон для отладки
            onClick={handleOpenModal}
            variant='text'
          >
            {logoutIcon}
            <span>{t.navbar.button.logOut}</span>
          </Button>
        </nav>
      </SideBar>
    </>
  )
}
