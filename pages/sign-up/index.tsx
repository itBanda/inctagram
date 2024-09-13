import Link from 'next/link'

import { getAuthLayout } from '../../components/ui/layouts/AuthLayout'

const SignUp = () => {
  return (
    <div className='text-center text-white'>
      SignUp
      <p>
        Lorem ipsum dolor sit amet,
        <Link className='text-cyan-500' href='/sign-up/privacy/privacy'>
          Privacy Policy
        </Link>
        adipisicing
        <Link className='text-cyan-500' href='/sign-up/privacy/terms'>
          Terms of Service
        </Link>
        . Fugit, obcaecati.
      </p>
    </div>
  )
}

export default SignUp

SignUp.getLayout = getAuthLayout
