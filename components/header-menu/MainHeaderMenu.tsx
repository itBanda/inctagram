import { LangSelect, NotificationBell } from '@/components'

export const MainHeaderMenu = () => {
  return (
    <div className='flex items-center gap-6 text-light-100'>
      <NotificationBell />
      <LangSelect />
    </div>
  )
}
