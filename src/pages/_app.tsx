import { BeerProvider } from '@/contexts/BeerContext'
import '@/styles/globals.css'

import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  // Note: Regarding the choice of ordering imports and not use semicolons? I would say it's a personal preference.
  // A team, all together, should decide on a style guide and stick to it.
  // I will always be consistent with the rest of the codebase.
  return (
    <BeerProvider>
      <Component {...pageProps} />
    </BeerProvider>
  )
}
