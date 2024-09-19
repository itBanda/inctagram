import { getMainLayout } from '../../components/ui/layouts/MainLayout'
import withAuth from '../../hocs/withAuth'

const Profile = () => {
  return <div className='text-center text-white'>Profile</div>
}

const ProfileWithAuth = withAuth(Profile)

export default ProfileWithAuth

ProfileWithAuth.getLayout = getMainLayout
