import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Navbar from '@/components/Navbar'

export default function App({ Component, pageProps }: AppProps) {
  return <div className='w-screen h-screen'>
    <Navbar />
    <div className='py-12'>
      <Component {...pageProps} />
    </div>
    
  </div>
}
