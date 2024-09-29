import { useEffect } from 'react'

import { Spinner } from '@/components'
import { authActions } from '@/features'
import { useAppDispatch } from '@/store'
import { useRouter } from 'next/router'

const GitHubAuth = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { accessToken, email } = router.query

  // access token заревертить, если нет токена, то ретернуть.......
  useEffect(() => {
    if (accessToken) {
      const getUserIdFromToken = (token: string) => {
        try {
          const payload = token.split('.')[1]
          const decodedPayload = JSON.parse(atob(payload))

          return decodedPayload.userId
        } catch (err) {
          console.error('Ошибка извлечения userId из токена', err)

          return null
        }
      }
      const userId = getUserIdFromToken(accessToken as string)

      if (userId) {
        dispatch(authActions.login({ accessToken: accessToken as string }))
        router.push(`/profile/${userId}`)
      }
    }
  }, [accessToken, email, router, dispatch])

  return <Spinner />
}

export default GitHubAuth
