import React from 'react'

import { Icon } from 'uikit-inctagram'

export const GitHabAuth = () => {
  const gitHubLogin = () => {
    window.location.assign('https://inctagram.work/api/v1/auth/github/login')
  }

  return <Icon color='white' height={36} icon='github' onClick={gitHubLogin} width={36} />
}

export default GitHabAuth
