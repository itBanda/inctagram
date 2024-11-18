import { ReactNode } from 'react'
import { createPortal } from 'react-dom'

import { useTranslation } from '@/hooks/useTranslation'
import { Button, Modal } from 'uikit-inctagram'

type Props = {
  body: ReactNode
  isOpened: boolean
  onClose: () => void
  title: string
}

export const EmailSentModal = ({ body, ...props }: Props) => {
  const { t } = useTranslation()

  if (typeof window === 'undefined') {
    return null
  }

  return createPortal(
    <Modal {...props}>
      <div className='flex flex-col gap-10'>
        {body}
        <div className='flex justify-end gap-6'>
          <Button className='px-8' onClick={props.onClose}>
            {t.common.modal.ok}
          </Button>
        </div>
      </div>
    </Modal>,
    window.document.getElementById('modal-container')!
  )
}
