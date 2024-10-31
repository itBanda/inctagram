import { ProfilePhoto, getMainLayout } from '@/components'
import { GeneralInformationForm } from '@/components/profile'
import { useTranslation } from '@/hooks/useTranslation'
import { profileApi } from '@/services'
import { Tabs } from 'uikit-inctagram'

const Settings = () => {
  const { t } = useTranslation()
  const { data: profileData } = profileApi.useProfileQuery()

  return (
    <section className='flex gap-9 pb-6'>
      <div className='m-6 w-full max-w-[972px]'>
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
      </div>
    </section>
  )
}

export default Settings
Settings.getLayout = getMainLayout
