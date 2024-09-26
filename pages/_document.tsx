import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html className='scrollbar-none' lang='en'>
      <Head />
      <body>
        <div id='modal-container'></div>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
