import { Notification } from '@/components/notification/example-notifications'
import { useTranslation } from '@/hooks/useTranslation'
import { cn } from '@/utils'

type Props = {
  className: string
  notifications: Notification[]
}

export const NotificationModal = ({ className, notifications }: Props) => {
  const { t } = useTranslation()

  return (
    <div
      className={cn(
        'absolute -right-1 z-20 mt-3 w-[355px] rounded-lg border border-dark-100 bg-dark-500',
        className
      )}
    >
      <div className='absolute -top-2 right-3.5 h-4 w-4 rotate-45 border-l border-t border-dark-100 bg-dark-500'></div>
      <h2 className='mx-4 border-b border-b-dark-100 py-3 text-base font-semibold text-light-100'>
        {notifications.length === 0 ? t.notification.noNotifications : t.notification.notifications}
      </h2>
      <ul className='custom-scrollbar mb-4 max-h-96 overflow-y-auto scrollbar-thin'>
        {notifications.map((notification, index) => (
          <li className='mx-4 border-b border-gray-700 py-3' key={index}>
            <div className='flex items-center'>
              <span className='text-sm font-semibold text-light-100'>
                {t.notification.newNotification}
              </span>
              {notification.isNew && (
                <span className='ml-1 text-xs text-accent-500'>{t.notification.new}</span>
              )}
            </div>
            <p className='text-sm text-light-100'>{notification.title}</p>
            <span className='text-xs text-light-900'>{notification.time}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
