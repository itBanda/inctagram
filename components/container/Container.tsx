import { ReactNode } from 'react'

import { cn } from '@/utils'

type PropsType = {
  children: ReactNode
  className?: string
}
export const Container = ({ children, className }: PropsType) => {
  return <div className={cn('mx-auto w-full max-w-[1060px] px-4', className)}>{children}</div>
}
