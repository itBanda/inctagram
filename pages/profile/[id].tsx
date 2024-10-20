import { Spinner, getMainLayout } from '@/components'
import { ProfilePhoto } from '@/components/profile-photo'
import withAuth from '@/hocs/withAuth'
import { useTranslation } from '@/hooks/useTranslation'
import { authApi, profileApi } from '@/services'

const Profile = () => {
  const { t } = useTranslation()
  const { data } = authApi.useAuthMeQuery()
  const { data: profile, isLoading: isLoadingProfile } = profileApi.useProfileQuery()

  return (
    <div className='text-center text-white'>
      {isLoadingProfile ? <Spinner /> : <ProfilePhoto profileAvatars={profile?.avatars ?? []} />}
      <h2>
        {t.authPage.form.userName}: {data?.userName}
      </h2>
      <h2>
        {t.authPage.form.email.email}: {data?.email}
      </h2>
    </div>
  )
}

const ProfileWithAuth = withAuth(Profile)

export default ProfileWithAuth

ProfileWithAuth.getLayout = getMainLayout
