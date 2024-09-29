import { SignInForm, getAuthLayout } from '@/components'
import { authActions, gitHubLogin } from '@/features'
import { authApi } from '@/services'
import { useAppDispatch } from '@/store'
import { hasGrantedAllScopesGoogle, useGoogleLogin } from '@react-oauth/google'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Button, Card, Icon, Typography } from 'uikit-inctagram'

// const login = (): void => {
//   const CLIENT_ID = '135295053738-s4rjv66sgldc1jvcrs6ambg34rn7rect.apps.googleusercontent.com' // ID вашего приложения
//   const REDIRECT_URL = 'http://localhost:3000/profile' // URL вашего клиента
//   const scope = 'email profile' // Запрашиваемые данные
//   const url = `https://accounts.google.com/o/oauth2/v2/auth?scope=${scope}&response_type=code&redirect_uri=${REDIRECT_URL}&client_id=${CLIENT_ID}`

//   window.location.assign(url)
// }
const SignIn = () => {
  const [google, { isLoading }] = authApi.useGoogleMutation()
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

        // const userId = response.userId
        // router.push(`/profile/${userId}`)
      } catch (error) {
        console.error('Google login failed:', error)
      }
    },
  })

  return (
    <section className='grid place-items-center px-4 py-9 text-light-100'>
      <Card className='w-full max-w-[378px]'>
        <header className='mb-6 flex flex-col gap-3'>
          <Typography.H1 className='text-center'>Sign In</Typography.H1>
          <div className='flex justify-center gap-16'>
            <Icon height={36} icon='google' onClick={loginWithGoogle} width={36} />
            <Icon height={36} icon='github' onClick={gitHubLogin} width={36} />
          </div>
        </header>
        <SignInForm />
        <footer className='flex flex-col items-center gap-3'>
          <Typography.TextBase className='light-100 text-center'>
            Don’t have an account?
          </Typography.TextBase>
          <Button asChild variant='text'>
            <Link href='/sign-up'>Sign Up</Link>
          </Button>
        </footer>
      </Card>
    </section>
  )
}

export default SignIn

// 1. тыкаю на гугл - открывается попап с выбором почты
// 2. выбираю почту - onSuccess срабатывает
// 3. берем токен из респонса tokenResponse
// 4. делаем запрос на свагер
// 5.{
//   "code": "токен из токен респонс"
// } отправить пост запросом /api/v1/auth/google/login
// 6. получаем акцесс токен из предыдущего респонса
// 7. закидываем в стор акцесс токен
// 8. редиректимся на профайл (айдишку из токена взять )
