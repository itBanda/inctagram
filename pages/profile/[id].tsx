import { getMainLayout } from '@/components'
import withAuth from '@/hocs/withAuth'
import { useTranslation } from '@/hooks/useTranslation'
import { authApi } from '@/services'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Button } from 'uikit-inctagram'

const Profile = () => {
  const { t } = useTranslation()
  const { data } = authApi.useAuthMeQuery()
  const router = useRouter()
  const { id: profileId } = router.query

  return (
    <div className='text-center text-white'>
      <h2>
        {t.authPage.form.userName}: {data?.userName}
      </h2>
      <h2>
        {t.authPage.form.email.email}: {data?.email}
      </h2>
      {data?.userId === +profileId && (
        <Button asChild>
          <Link href='/general-information'>Profile Settings</Link>
        </Button>
      )}
    </div>
  )
}

const ProfileWithAuth = withAuth(Profile)

export default ProfileWithAuth

ProfileWithAuth.getLayout = getMainLayout
