import { ProfilePhoto, getMainLayout } from '@/components'
import { Container } from '@/components/container'
import { GeneralInformationForm } from '@/components/profile'
import withAuth from '@/hocs/withAuth'
import { useTranslation } from '@/hooks/useTranslation'
import { profileApi } from '@/services'
import { Tabs } from 'uikit-inctagram'

const Settings = () => {
  const { t } = useTranslation()
  const { data: profileData } = profileApi.useProfileQuery()

  return (
    <section className='pb-6'>
      <Container className='max-w-[972px] p-6'>
        <Tabs
          tabsData={[
            {
              content: (
                <div className='flex gap-10 pt-6'>
                  <ProfilePhoto profileAvatars={profileData?.avatars ? profileData.avatars : []} />
                  <GeneralInformationForm />
                </div>
              ),
              title: t.tabs.generalInfo,
              value: 'tab1',
            },
            { content: ' ', title: t.tabs.devices, value: 'tab2' },
            { content: ' ', title: t.tabs.accountManagement, value: 'tab3' },
            { content: ' ', title: t.tabs.payments, value: 'tab4' },
          ]}
        ></Tabs>
      </Container>
    </section>
  )
}

const SettingsWithAuth = withAuth(Settings)

export default SettingsWithAuth
SettingsWithAuth.getLayout = getMainLayout
