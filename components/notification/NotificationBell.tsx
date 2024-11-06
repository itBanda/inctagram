import { useState } from 'react'

import { Icon, NotificationModal } from '@/components'
import { exampleNotifications } from '@/components/notification/example-notifications'

export const NotificationBell = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleNotifications = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className='relative hover:text-accent-100'>
      <Icon
        color='white'
        cursor='pointer'
        icon='outline-bell'
        onClick={toggleNotifications}
        width={36}
      />
      {!!exampleNotifications.length && (
        <div className='absolute -top-1 right-0 h-4 min-w-4 rounded-full bg-danger-500 px-1 text-center text-xs text-light-100'>
          {exampleNotifications.length}
        </div>
      )}
      {isOpen && <NotificationModal notifications={exampleNotifications} />}
    </div>
  )
}
