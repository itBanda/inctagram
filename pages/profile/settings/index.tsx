import { GeneralInformationForm } from '@/components/profile'
import { getEditProfileLayout } from '@/components/ui/layouts/EditProfileLayout'
import { useTranslation } from '@/hooks/useTranslation'
import { Button, Card, Icon } from 'uikit-inctagram'

const GeneralInformation = () => {
  const { t } = useTranslation()

  return (
    <div className='flex gap-9 pb-6'>
      <div className='flex flex-col gap-6'>
        <Card className='mt-12 flex h-48 w-48 items-center justify-center rounded-full bg-dark-500'>
          <Icon color='white' height={46} icon='image-outline' width={46} />
        </Card>
        <Button className='w-[196px]' variant='outlined'>
          {t.profileSettings.add_photo}
        </Button>
      </div>
      <GeneralInformationForm />
    </div>
  )
}

export default GeneralInformation
GeneralInformation.getLayout = getEditProfileLayout
