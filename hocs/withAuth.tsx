import { useEffect } from 'react'

import { Spinner } from '@/components'
import { authSelectors } from '@/features'
import { NextPageWithLayout } from '@/pages/_app'
import { authApi } from '@/services'
import { useAppSelector } from '@/store'
import { useRouter } from 'next/router'

const withAuth = <T extends object>(WrappedComponent: NextPageWithLayout<T>) => {
  const WithAuthComponent: NextPageWithLayout<T> = (props: T) => {
    const router = useRouter()
    const isLoggedIn = useAppSelector(authSelectors.selectIsLoggedIn)
    const { isLoading: isAuthMeLoading } = authApi.useAuthMeQuery()

    useEffect(() => {
      if (isAuthMeLoading) {
        return
      }
      if (!isLoggedIn) {
        router.push('/sign-in')
      }
    }, [isLoggedIn, router, isAuthMeLoading])

    if (isAuthMeLoading || !isLoggedIn) {
      return <Spinner />
    }

    return <WrappedComponent {...props} />
  }

  WithAuthComponent.getLayout = WrappedComponent.getLayout

  return WithAuthComponent
}

export default withAuth
