import { useState } from 'react'

import { LangSelect } from '@/components'
import { ConfirmationModal } from '@/components/modals'
import { authActions } from '@/features'
import { useTranslation } from '@/hooks/useTranslation'
import { authApi } from '@/services'
import { useAppDispatch } from '@/store'
import { Button, Typography } from 'uikit-inctagram'

export const MainHeaderMenu = () => {
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
        console.log(err)
      })
  }

  return (
    <div className='flex items-center gap-6'>
      <ConfirmationModal
        body={
          <Typography.TextBase className='text-light-100'>
            {t.modal.logOut.confirm(data?.email)}
          </Typography.TextBase>
        }
        isLoading={isLogoutLoading}
        isOpened={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleLogout}
        title={t.modal.logOut.logOut}
      />
      <LangSelect />
      <Button onClick={handleOpenModal} variant='text'>
        {t.navbar.logOut}
      </Button>
    </div>
  )
}
