import { useEffect, useState } from 'react'

import { Icon, NotificationModal } from '@/components'
import { exampleNotifications } from '@/components/notification/example-notifications'
import { cn } from '@/utils'

export const NotificationBell = () => {
  const [isOpen, setIsOpen] = useState(false)
  const countNote = exampleNotifications?.length
  const toggleNotifications = () => setIsOpen(!isOpen)

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => e.key === 'Escape' && setIsOpen(false)
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        event.target instanceof HTMLElement &&
        !event.target.closest('.notification-modal')
      ) {
        setIsOpen(false)
      }
    }

    if (!isOpen) {
      return
    }

    window.addEventListener('keydown', handleEscape)
    window.addEventListener('mousedown', handleClickOutside)

    return () => {
      window.removeEventListener('keydown', handleEscape)
      window.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  return (
    <div className='relative'>
      <Icon
        className={cn(isOpen ? 'text-accent-500' : 'transition hover:text-accent-500')}
        cursor='pointer'
        icon={isOpen ? 'fill-bell' : 'outline-bell'}
        onClick={toggleNotifications}
      />
      {!!countNote && (
        <div
          className={cn(
            'pointer-events-none absolute -right-1 -top-1 h-4 min-w-4 rounded-full bg-danger-500 px-1 text-center text-xs text-light-100',
            { '-right-2.5': countNote > 19 },
            { '-right-4': countNote > 99 }
          )}
        >
          {countNote <= 99 ? countNote : '99+'}
        </div>
      )}
      {isOpen && (
        <NotificationModal className='notification-modal' notifications={exampleNotifications} />
      )}
    </div>
  )
}
