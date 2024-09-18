import { useLayoutEffect } from 'react'

import { useRouter } from 'next/router'

import { NextPageWithLayout } from '../pages/_app'
import { useAppSelector } from '../store'

const withAuth = <T extends object>(WrappedComponent: NextPageWithLayout<T>) => {
  const WithAuthComponent: NextPageWithLayout<T> = (props: T) => {
    const router = useRouter()
    const accessToken = useAppSelector(state => state.auth.accessToken)

    useLayoutEffect(() => {
      if (!accessToken) {
        if (typeof window !== 'undefined') {
          router.push('/sign-in')
        }
      }
    }, [accessToken, router])

    if (!accessToken) {
      return null
    }

    return <WrappedComponent {...props} />
  }

  WithAuthComponent.getLayout = WrappedComponent.getLayout

  return WithAuthComponent
}

export default withAuth
