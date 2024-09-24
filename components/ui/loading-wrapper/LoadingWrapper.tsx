import { PropsWithChildren, useEffect } from 'react'

import { useRouter } from 'next/router'

import { appActions, appSelectors } from '../../../features'
import { useAppDispatch, useAppSelector } from '../../../store'
import { Spinner } from './Spinner'

export const LoadingWrapper = ({ children }: PropsWithChildren) => {
  const dispatch = useAppDispatch()
  const isAppLoading = useAppSelector(appSelectors.selectIsAppLoading)

  const router = useRouter()

  useEffect(() => {
    const startLoading = (route: string) => {
      if (route !== router.route) {
        dispatch(appActions.setAppLoading({ isAppLoading: true }))
      }
    }

    const endLoading = () => {
      setTimeout(() => dispatch(appActions.setAppLoading({ isAppLoading: false })), 200)
    }

    router.events.on('routeChangeStart', startLoading)
    router.events.on('routeChangeComplete', endLoading)
    router.events.on('routeChangeError', endLoading)

    return () => {
      router.events.off('routeChangeStart', startLoading)
      router.events.off('routeChangeComplete', endLoading)
      router.events.off('routeChangeError', endLoading)
    }
  }, [router, dispatch])

  if (isAppLoading) {
    return <Spinner />
  }

  return children
}
