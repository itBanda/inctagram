import { Icon } from '@/components'

type Props = {
  count?: number
}
export const NotificationBell = ({ count }: Props) => {
  return (
    <div className='relative hover:text-accent-100'>
      <Icon
        color='white'
        cursor='pointer'
        icon='outline-bell'
        //onClick={}
        width={36}
      />
      {!!count && (
        <div className='absolute -top-1 right-0 h-4 min-w-4 rounded-full bg-danger-500 px-1 text-center text-xs text-light-100'>
          {count}
        </div>
      )}
    </div>
  )
}
