import { getMainLayout } from '@/components/ui/layouts/MainLayout'
import withAuth from '@/hocs/withAuth'
import { useRouter } from 'next/router'

const Profile = () => {
  const router = useRouter()

  return <div className='text-center text-white'>Profile {router.query.id}</div>
}

const ProfileWithAuth = withAuth(Profile)

export default ProfileWithAuth

ProfileWithAuth.getLayout = getMainLayout
