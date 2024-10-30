import { getMainLayout } from '@/components'
import { GeneralInformationForm } from '@/components/profile'
import { useTranslation } from '@/hooks/useTranslation'
import { Tabs } from 'uikit-inctagram'

const Settings = () => {
  const { t } = useTranslation()

  return (
    <section className='flex gap-9 pb-6'>
      <div className='m-6 w-full max-w-[972px]'>
        <Tabs
          tabsData={[
            {
              content: (
                <div className='flex gap-10 pt-12'>
                  <GeneralInformationForm />
                </div>
              ),
              title: t.tabs.generalInfo,
              value: 'tab1',
            },
            { content: ' ', title: t.tabs.devices, value: 'tab2' },
            { content: ' ', title: t.tabs.account_management, value: 'tab3' },
            { content: ' ', title: t.tabs.payments, value: 'tab4' },
          ]}
        ></Tabs>
      </div>
      {/*<div className='flex flex-col gap-6'>*/}
      {/*    <Card className='mt-12 flex h-48 w-48 items-center justify-center rounded-full bg-dark-500'>*/}
      {/*        <Icon color='white' height={46} icon='image-outline' width={46}/>*/}
      {/*    </Card>*/}
      {/*    <Button className='w-[196px]' variant='outlined'>*/}
      {/*        {t.profileSettings.add_photo}*/}
      {/*    </Button>*/}
      {/*</div>*/}
      {/*<GeneralInformationForm/>*/}
    </section>
  )
}

export default Settings
Settings.getLayout = getMainLayout
