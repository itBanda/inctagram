import { useEffect, useState } from 'react'

import { getAuthLayout } from '@/components/ui/layouts/AuthLayout'
import { PageDataKey, ServicePolicyData } from '@/pages/servicePolicy/servicePolicy'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Icon } from 'uikit-inctagram'

const formatTextToHtml = (text: string) => text.replace(/\n+/g, '</p><p>')

const ServicePolicy = () => {
  const router = useRouter()
  const { slug } = router.query
  const [data, setData] = useState<{ text: string; title: string }>({ text: '', title: '' })

  useEffect(() => {
    const slugString = Array.isArray(slug) ? slug[0] : (slug ?? '')

    setData(
      ServicePolicyData[slugString as PageDataKey] || {
        text: 'Content not available',
        title: 'Page Not Found',
      }
    )
  }, [slug])

  return (
    <div className='mx-auto max-w-[1232px] px-4 py-6 text-center text-light-100 sm:px-6 lg:px-8'>
      <Link className='flex items-center gap-3 text-white' href='/sign-up'>
        <Icon className='cursor-pointer' icon='arrow-back-outline' />
        Back to Sign Up
      </Link>
      <h1 className='py-6 text-xl font-bold'>{data.title}</h1>
      <div
        className='mx-auto max-w-[958px] cursor-default text-sm leading-6'
        dangerouslySetInnerHTML={{ __html: formatTextToHtml(data.text) }}
      ></div>
    </div>
  )
}

export default ServicePolicy
ServicePolicy.getLayout = getAuthLayout
