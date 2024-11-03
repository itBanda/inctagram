import { ComponentPropsWithoutRef, PropsWithChildren } from 'react'

import { cn } from '@/utils'

export const Container = ({
  children,
  className,
  ...props
}: PropsWithChildren<ComponentPropsWithoutRef<'div'>>) => {
  return (
    <div className={cn('w-full max-w-[1060px] pb-6 pl-6 pr-16 pt-9', className)} {...props}>
      {children}
    </div>
  )
}
