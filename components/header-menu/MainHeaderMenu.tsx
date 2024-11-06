import { LangSelect, NotificationBell } from '@/components'

export const MainHeaderMenu = () => {
  return (
    <div className='flex items-center gap-6 text-light-100'>
      <NotificationBell count={1} />
      <LangSelect />
    </div>
  )
}
