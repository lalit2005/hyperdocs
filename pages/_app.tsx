import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import { SessionProvider } from 'next-auth/react';
import { SWRConfig } from 'swr';
import Head from 'next/head';
import { Toaster } from 'react-hot-toast';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
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
  );
}

export default MyApp;
