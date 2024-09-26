import { getMainLayout } from '@/components'
import withAuth from '@/hocs/withAuth'
import { authApi } from '@/services'

const Profile = () => {
  const { data } = authApi.useAuthMeQuery()

  return (
    <div className='text-center text-white'>
      <h2>Username: {data?.userName}</h2>
      <h2>Email: {data?.email}</h2>
    </div>
  )
}

const ProfileWithAuth = withAuth(Profile)

export default ProfileWithAuth

ProfileWithAuth.getLayout = getMainLayout
