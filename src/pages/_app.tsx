import { BeerProvider } from '@/contexts/BeerContext'
import '@/styles/globals.css'

import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <BeerProvider>
      <Component {...pageProps} />
    </BeerProvider>
  )
}
