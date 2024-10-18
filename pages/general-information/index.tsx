import { GeneralInformationForm } from '@/components/profile/GeneralInformationForm'
import { getEditProfileLayout } from '@/components/ui/layouts/EditProfileLayout'
import { Card } from 'uikit-inctagram'

const GeneralInformation = () => {
  return (
    <div>
      {/*tabs*/}
      {/*<div className='flex gap-4 h-full'>*/}
      {/*<Card className='w-1/4 h-9 m-4 bg-dark-300'>*/}
      {/*  photo*/}
      {/*</Card>*/}
      {/*<div className='flex-1 flex flex-col m-4 border-2 border-danger-100'>*/}
      <GeneralInformationForm />

      {/*</div>*/}
    </div>
  )
}

export default GeneralInformation
GeneralInformation.getLayout = getEditProfileLayout
