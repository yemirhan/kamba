import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html className='bg-background w-full h-full min-h-screen'>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}