import type { AppProps } from 'next/app'

import { ReactElement, ReactNode } from 'react'
import { Provider } from 'react-redux'

import { NextPage } from 'next'
import { appWithI18Next } from 'ni18n'

import '@/styles/globals.css'
import 'uikit-inctagram/style.css'

import { LoadingWrapper } from '../components/ui/loading-wrapper/LoadingWrapper'
import { ni18nConfig } from '../ni18n.config'
import { wrapper } from '../store'

export type NextPageWithLayout<P = {}, IP = P> = {
  getLayout?: (page: ReactElement) => ReactNode
} & NextPage<P, IP>

type AppPropsWithLayout = {
  Component: NextPageWithLayout
} & AppProps

function MyApp({ Component, ...rest }: AppPropsWithLayout) {
  const { props, store } = wrapper.useWrappedStore(rest)

  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? (page => page)

  return (
    <Provider store={store}>
      <LoadingWrapper>{getLayout(<Component {...props.pageProps} />)}</LoadingWrapper>
    </Provider>
  )
}

export default appWithI18Next(MyApp, ni18nConfig)
