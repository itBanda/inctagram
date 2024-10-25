import { useState } from 'react'

import { ConfirmationModal } from '@/components/modals'
import { MenuItem, logoutIcon, menu1, menu2 } from '@/components/navbar/constants'
import { authActions } from '@/features'
import { useTranslation } from '@/hooks/useTranslation'
import { LocaleType } from '@/public'
import { authApi } from '@/services'
import { useAppDispatch } from '@/store'
import { cn } from '@/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button, SideBar, Typography } from 'uikit-inctagram'

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
  const currentPath = usePathname()

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
          className={cn('flex items-center gap-3 transition hover:text-accent-100', {
            'text-accent-100': currentPath === menuItem.href,
          })}
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
      <SideBar className='custom-scrollbar flex-shrink-0 flex-grow basis-[220px] flex-col items-center justify-start pb-9 pt-[72px] scrollbar-thin'>
        <nav className='flex flex-col gap-[60px]'>
          <ul className='flex flex-col gap-6'>{renderMenuItems(menu1)}</ul>
          <ul className='flex flex-col gap-6'>{renderMenuItems(menu2)}</ul>
          <Button
            className='flex items-center gap-3 p-0 font-medium text-light-100 focus:ring-light-100'
            onClick={handleOpenModal}
            variant='text'
          >
            {logoutIcon}
            <span>{t.navbar.logOut}</span>
          </Button>
        </nav>
      </SideBar>
    </>
  )
}
