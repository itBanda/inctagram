import { GeneralInformationForm } from '@/components/profile'
import { getEditProfileLayout } from '@/components/ui/layouts/EditProfileLayout'
import { Button, Card, Icon } from 'uikit-inctagram'

const GeneralInformation = () => {
  return (
    <div className='flex gap-9'>
      <div className='flex flex-col gap-6'>
        <Card className='mt-12 flex h-48 w-48 items-center justify-center rounded-full bg-dark-500'>
          <Icon color='white' height={46} icon='image-outline' width={46} />
        </Card>
        <Button className='w-[196px]' variant='outlined'>
          Add a Profile Photo
        </Button>
      </div>
      <GeneralInformationForm />
    </div>
  )
}

export default GeneralInformation
GeneralInformation.getLayout = getEditProfileLayout
