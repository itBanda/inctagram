import { useEffect } from 'react'

import { Spinner, getAuthLayout } from '@/components'
import { authActions } from '@/features'
import { useAppDispatch } from '@/store'
import { useRouter } from 'next/router'

const OAuthGithub = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const accessToken = router.query.accessToken as string

  useEffect(() => {
    if (accessToken) {
      const getUserIdFromToken = (token: string) => {
        try {
          const payload = token.split('.')[1]
          const decodedPayload = JSON.parse(atob(payload))

          return decodedPayload.userId
        } catch (err) {
          console.error('Error extracting userId from token', err)

          return null
        }
      }
      const userId = getUserIdFromToken(accessToken)

      if (userId) {
        dispatch(authActions.login({ accessToken }))
        router.push(`/profile/${userId}`)
      }
    }
  }, [accessToken, router, dispatch])

  return <Spinner />
}

export default OAuthGithub
OAuthGithub.getLayout = getAuthLayout
