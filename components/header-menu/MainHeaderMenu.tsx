import { useState } from 'react'

import { ConfirmationModal } from '@/components/modals'
import { authActions } from '@/features'
import { authApi } from '@/services'
import { useAppDispatch } from '@/store'
import { Button, Typography } from 'uikit-inctagram'

export const MainHeaderMenu = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const dispatch = useAppDispatch()
  const { data } = authApi.useAuthMeQuery()

  const handleOpenModal = () => setIsModalOpen(true)
  const handleCloseModal = () => setIsModalOpen(false)
  const handleLogout = () => {
    dispatch(authActions.logout())
  }

  return (
    <div className='flex items-center gap-6'>
      <ConfirmationModal
        body={
          <Typography.TextBase className='text-light-100'>
            Are you really want to log out of your account {data?.email}?
          </Typography.TextBase>
        }
        isOpened={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleLogout}
        title='Confirm logout'
      />
      <Button onClick={handleOpenModal} variant='text'>
        Logout
      </Button>
    </div>
  )
}
