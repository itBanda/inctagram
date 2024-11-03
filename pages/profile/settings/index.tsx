import { useState } from 'react'

import { Container, GeneralInformationForm, ProfilePhoto, getMainLayout } from '@/components'
import withAuth from '@/hocs/withAuth'
import { profileApi } from '@/services'
import { Tabs } from 'uikit-inctagram'

const Settings = () => {
  const [selectedDate, setSelectedDate] = useState<Date>()

  const { data: profileData } = profileApi.useGetProfileQuery()

  return (
    <section>
      <Container>
        <Tabs
          tabsData={[
            {
              content: (
                <div className='flex gap-10 pt-12'>
                  <ProfilePhoto profileAvatars={profileData?.avatars ?? []} />
                  <GeneralInformationForm />
                </div>
              ),
              title: 'General information',
              value: 'gi',
            },
            {
              content: <div className=''>Devices</div>,
              title: 'Devices',
              value: 'dev',
            },
            {
              content: <div className=''>Account managment</div>,
              title: 'Account managment',
              value: 'ac',
            },
            {
              content: <div className=''>My payments</div>,
              title: 'My payments',
              value: 'mp',
            },
          ]}
        />

        {/* <DatePicker mode='single' onSelect={setSelectedDate} selected={selectedDate} /> */}
      </Container>
    </section>
  )
}

const SettingsWithAuth = withAuth(Settings)

export default SettingsWithAuth

SettingsWithAuth.getLayout = getMainLayout
