import { Avatar, getMainLayout } from '@/components'
import withAuth from '@/hocs/withAuth'
import { useTranslation } from '@/hooks/useTranslation'
import { authApi, publicUserApi } from '@/services'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Button } from 'uikit-inctagram'

const Profile = () => {
  const { t } = useTranslation()
  const { data: authMeData } = authApi.useAuthMeQuery()

  const router = useRouter()
  const profileId = Number(router.query.id)

  const { data: publicProfileData, isLoading: isLoadingPublicProfile } =
    publicUserApi.useGetPublicProfileByIdQuery({ profileId })

  const isCurrentUser = authMeData?.userId === publicProfileData?.id

  if (!profileId) {
    return <p className='text-light-100'>Profile id is invalid</p>
  }

  return (
    <section className='py-9 pl-6 pr-16'>
      <div className='flex items-start justify-between'>
        <Avatar
          alt={publicProfileData?.userName}
          imageUrl={publicProfileData?.avatars[0]?.url}
          isLoading={isLoadingPublicProfile}
        />
        {isCurrentUser && (
          <Button asChild variant='secondary'>
            <Link href='/profile/settings'>{t.profile.button.profileSettings}</Link>
          </Button>
        )}
      </div>
    </section>
  )
}

const ProfileWithAuth = withAuth(Profile)

export default ProfileWithAuth

ProfileWithAuth.getLayout = getMainLayout
