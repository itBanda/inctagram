import { useLayoutEffect } from 'react'

import { useRouter } from 'next/router'

import { authSelectors } from '../features'
import { NextPageWithLayout } from '../pages/_app'
import { useAppSelector } from '../store'

const withAuth = <T extends object>(WrappedComponent: NextPageWithLayout<T>) => {
  const WithAuthComponent: NextPageWithLayout<T> = (props: T) => {
    const router = useRouter()
    const isLoggedIn = useAppSelector(authSelectors.selectIsLoggedIn)

    useLayoutEffect(() => {
      if (!isLoggedIn) {
        if (typeof window !== 'undefined') {
          router.push('/sign-in')
        }
      }
    }, [isLoggedIn, router])

    if (!isLoggedIn) {
      return null
    }

    return <WrappedComponent {...props} />
  }

  WithAuthComponent.getLayout = WrappedComponent.getLayout

  return WithAuthComponent
}

export default withAuth
