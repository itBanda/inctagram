import { ReactNode } from 'react'

type Props = {
  children: ReactNode
  className?: string
}
const Container = ({ children, className }: Props) => {
  return (
    <div className={`mx-auto max-w-[972px] border-red-300 px-4 sm:px-6 lg:px-8 ${className} `}>
      {children}
    </div>
  )
}

export default Container
