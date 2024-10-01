import { authActions } from '@/features'
import { authApi } from '@/services'
import { useAppDispatch } from '@/store'
import { useGoogleLogin } from '@react-oauth/google'
import { useRouter } from 'next/router'
import { Icon } from 'uikit-inctagram'

export const GoogleAuth = () => {
  const [google] = authApi.useGoogleMutation()
  const dispatch = useAppDispatch()
  const router = useRouter()

  const loginWithGoogle = useGoogleLogin({
    flow: 'auth-code',
    onError: error => {
      console.error('Google login failed:', error)
    },

    onSuccess: async res => {
      try {
        const { code } = res

        const response = await google({ code }).unwrap()

        dispatch(authActions.login({ accessToken: response.accessToken }))

        const email = response.email

        router.push(`/profile/${email}`)
      } catch (error) {
        console.error('Google login failed:', error)
      }
    },
  })

  return <Icon cursor='pointer' height={36} icon='google' onClick={loginWithGoogle} width={36} />
}
