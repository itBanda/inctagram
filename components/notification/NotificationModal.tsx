import { Notification } from '@/components/notification/example-notifications'

type Props = {
  notifications: Notification[]
}

export const NotificationModal = ({ notifications }: Props) => {
  return (
    <div className='absolute -right-1 mt-3 w-[355px] rounded-lg border border-dark-100 bg-dark-500'>
      <div className='absolute -top-2 right-3.5 h-4 w-4 rotate-45 border-l border-t border-dark-100 bg-dark-500'></div>
      <h3 className='mx-4 border-b border-b-dark-100 py-3 text-base font-semibold text-light-100'>
        Уведомления
      </h3>
      <div className='custom-scrollbar mb-4 max-h-96 overflow-y-auto scrollbar-thin'>
        {notifications.map((notification, index) => (
          <div className='mx-4 border-b border-gray-700 py-3' key={index}>
            <div className='flex items-center'>
              <span className='text-sm font-semibold text-light-100'>Новое уведомление!</span>
              {notification.isNew && <span className='ml-1 text-xs text-accent-500'>Новое</span>}
            </div>
            <p className='text-sm text-light-100'>{notification.title}</p>
            <p className='text-xs text-light-900'>{notification.time}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
