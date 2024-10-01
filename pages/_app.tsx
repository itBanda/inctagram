import type { AppProps } from 'next/app'

import { PropsWithChildren, ReactElement, ReactNode, useEffect } from 'react'
import { Provider } from 'react-redux'

import { useAppDispatch, useAppSelector, wrapper } from '@/store'
import { appActions, appSelectors } from '@/store/appSlice'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { NextPage } from 'next'

import '@/styles/globals.css'
import 'uikit-inctagram/style.css'

export type NextPageWithLayout<P = {}, IP = P> = {
  getLayout?: (page: ReactElement) => ReactNode
} & NextPage<P, IP>

type AppPropsWithLayout = {
  Component: NextPageWithLayout
} & AppProps

export default function MyApp({ Component, ...rest }: AppPropsWithLayout) {
  const { props, store } = wrapper.useWrappedStore(rest)

  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? (page => page)

  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_CLIENT_ID}>
      <Provider store={store}>
        <App>{getLayout(<Component {...props.pageProps} />)}</App>
      </Provider>
    </GoogleOAuthProvider>
  )
}

const App = ({ children }: PropsWithChildren) => {
  const isAppInitialized = useAppSelector(appSelectors.selectIsAppInitialized)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(appActions.init())
  }, [dispatch])

  return children
}
