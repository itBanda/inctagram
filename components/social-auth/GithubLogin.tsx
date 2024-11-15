import { Icon } from '@/components'

export const GithubLogin = () => {
  const gitHubLogin = () => {
    window.location.assign('https://inctagram.work/api/v1/auth/github/login')
  }

  return (
    <Icon
      color='white'
      cursor='pointer'
      height={36}
      icon='github'
      onClick={gitHubLogin}
      width={36}
    />
  )
}
