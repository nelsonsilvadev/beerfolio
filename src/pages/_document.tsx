import { Analytics } from '@vercel/analytics/react'

import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en" className="h-full antialiased">
      <Head>
        <meta
          name="description"
          content="An innovative and immersive web platform for discovering, rating and curating a personalized collection of beers."
        />

        <meta name="msapplication-TileColor" content="#f8f9f2" />
        <meta name="theme-color" content="#f8f9f2" />

        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#f8f9f2" />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />

        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />

        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />

        <link rel="preconnect" href="https://fonts.googleapis.com" />

        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        <link
          href="https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <body className="flex min-h-full flex-col">
        <Main />
        <NextScript />
        <Analytics />
      </body>
    </Html>
  )
}
