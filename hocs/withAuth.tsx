import { useEffect } from 'react'

import { useRouter } from 'next/router'

import { Spinner } from '../components/ui/loading-wrapper/Spinner'
import { appSelectors, authSelectors } from '../features'
import { NextPageWithLayout } from '../pages/_app'
import { useAppSelector } from '../store'

const withAuth = <T extends object>(WrappedComponent: NextPageWithLayout<T>) => {
  const WithAuthComponent: NextPageWithLayout<T> = (props: T) => {
    const router = useRouter()
    const isAppLoading = useAppSelector(appSelectors.selectIsAppLoading)
    const isLoggedIn = useAppSelector(authSelectors.selectIsLoggedIn)

    useEffect(() => {
      if (!isLoggedIn) {
        router.push('/sign-in')
      }
    }, [isLoggedIn, router])

    if (isAppLoading) {
      return <Spinner />
    }

    return <WrappedComponent {...props} />
  }

  WithAuthComponent.getLayout = WrappedComponent.getLayout

  return WithAuthComponent
}

export default withAuth
