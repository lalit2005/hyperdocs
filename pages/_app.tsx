import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import { SessionProvider } from 'next-auth/react';
import { SWRConfig } from 'swr';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <SWRConfig
        value={{ fetcher: (url) => fetch(url).then((res) => res.json()) }}>
        <ThemeProvider attribute='class'>
          <Component {...pageProps} />
        </ThemeProvider>
      </SWRConfig>
    </SessionProvider>
  );
}

export default MyApp;
