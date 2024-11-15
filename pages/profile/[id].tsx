import { Avatar, getMainLayout } from '@/components'
import { Container } from '@/components/container'
import withAuth from '@/hocs/withAuth'
import { useTranslation } from '@/hooks/useTranslation'
import { authApi, publicUserApi } from '@/services'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Button } from 'uikit-inctagram'

const Profile = () => {
  const { t } = useTranslation()
  const { data: authMeData } = authApi.useAuthMeQuery(undefined, {
    refetchOnMountOrArgChange: true,
  })

  const router = useRouter()
  const profileId = Number(router.query.id)

  const { data: publicProfileData, isLoading: isLoadingPublicProfile } =
    publicUserApi.useGetPublicProfileByIdQuery({ profileId })

  const isCurrentUser = authMeData?.userId === publicProfileData?.id

  if (!profileId) {
    return <p className='text-light-100'>{t.myProfile.invalidId}</p>
  }

  return (
    <section>
      <Container className='flex items-start justify-between py-9 pl-6 pr-16'>
        <Avatar
          alt={publicProfileData?.userName}
          imageUrl={publicProfileData?.avatars[0]?.url}
          isLoading={isLoadingPublicProfile}
        />
        <h2 className='text-light-100'>
          {t.profileSettings.userName}: {publicProfileData?.userName}
        </h2>

        {isCurrentUser && (
          <Button asChild variant='secondary'>
            <Link href='/profile/settings'>{t.myProfile.button.profileSettings}</Link>
          </Button>
        )}
      </Container>
    </section>
  )
}

const ProfileWithAuth = withAuth(Profile)

export default ProfileWithAuth

ProfileWithAuth.getLayout = getMainLayout
