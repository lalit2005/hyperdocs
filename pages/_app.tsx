import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import { SessionProvider } from 'next-auth/react';
import { SWRConfig } from 'swr';
import Head from 'next/head';
import { Toaster } from 'react-hot-toast';
import { NextSeo } from 'next-seo';
import Script from 'next/script';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <div>
      <NextSeo
        title='Hyperdocs'
        description='Easiest way to build your own documentation website without any config'
        openGraph={{
          url: 'https://hyperdocs.netlify.app',
          title: 'Hyperdocs',
          description:
            'Easiest way to build your own documentation website without any config',
          images: [
            {
              url: 'https://hyperdocs.netlify.app/ogimage.png',
            },
          ],
        }}
        twitter={{
          cardType: 'summary_large_image',
          handle: '@lalit2005',
        }}
      />
      <Script
        async
        defer
        strategy='lazyOnload'
        data-website-id='f5fb6854-4d11-4e2c-a31d-883996688672'
        src='https://lalit-projects-analytics.vercel.app/umami.js'
      />
      <SessionProvider session={session}>
        <Head>
          <title>Hyperdocs - Documentation made easy</title>
          <link rel='shortcut icon' href='/favicon.png' type='image/x-icon' />
        </Head>
        <SWRConfig
          value={{ fetcher: (url) => fetch(url).then((res) => res.json()) }}>
          <ThemeProvider attribute='class'>
            <Component {...pageProps} />
            <Toaster position='bottom-left' />
          </ThemeProvider>
        </SWRConfig>
      </SessionProvider>
    </div>
  );
}

export default MyApp;
