import { authActions } from '@/features'
import { authApi } from '@/services'
import { useAppDispatch } from '@/store'
import { useGoogleLogin } from '@react-oauth/google'
import { useRouter } from 'next/router'
import { Icon } from 'uikit-inctagram'

export const GoogleLogin = () => {
  const [googleLogin] = authApi.useGoogleLoginMutation()
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

        const response = await googleLogin({ code }).unwrap()

        dispatch(authActions.login({ accessToken: response.accessToken }))

        const payload = response.accessToken.split('.')[1]
        const id = JSON.parse(atob(payload)).userId

        router.push(`/profile/${id}`)
      } catch (error) {
        console.error('Google login failed:', error)
      }
    },
  })

  return <Icon cursor='pointer' height={36} icon='google' onClick={loginWithGoogle} width={36} />
}
