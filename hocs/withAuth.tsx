import { ComponentType, useLayoutEffect } from 'react'

import { useRouter } from 'next/router'

import { useAppSelector } from '../store'

const withAuth = <T extends object>(WrappedComponent: ComponentType<T>) => {
  return function WithAuthComponent(props: T) {
    const router = useRouter()
    const accessToken = useAppSelector(state => state.auth.accessToken)

    useLayoutEffect(() => {
      if (!accessToken) {
        router.push('/sign-in')
      }
    }, [accessToken, router])

    if (!accessToken) {
      return null
    }

    return <WrappedComponent {...props} />
  }
}

export default withAuth
