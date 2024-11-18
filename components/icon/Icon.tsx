import dynamic from 'next/dynamic'

export const Icon = dynamic(() => import('uikit-inctagram').then(Component => Component.Icon), {
  ssr: false,
})
