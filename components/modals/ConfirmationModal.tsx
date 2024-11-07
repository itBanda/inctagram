import { ReactNode } from 'react'
import { createPortal } from 'react-dom'

import { useTranslation } from '@/hooks/useTranslation'
import { Button, Modal } from 'uikit-inctagram'

type Props = {
  body: ReactNode
  isLoading?: boolean
  isOpened: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
}

export const ConfirmationModal = ({ body, isLoading, onConfirm, ...props }: Props) => {
  const { t } = useTranslation()

  if (typeof window === 'undefined') {
    return null
  }

  return createPortal(
    <Modal {...props}>
      <div className='flex flex-col gap-10'>
        {body}
        <div className='flex justify-end gap-6'>
          <Button className='px-8' disabled={isLoading} onClick={onConfirm}>
            {t.modal.yes}
          </Button>
          <Button className='px-8' onClick={props.onClose} variant='outlined'>
            {t.modal.no}
          </Button>
        </div>
      </div>
    </Modal>,
    window.document.getElementById('modal-container')!
  )
}
