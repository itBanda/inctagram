import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html className='scrollbar-none'>
      <Head />
      <body className='overflow-y-hidden'>
        <div id='modal-container'></div>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
