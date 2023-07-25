import React, { ReactElement, ReactNode } from 'react';
import { AppProps } from 'next/app';
import Layout from '../components/Layout';
import { NextPage } from 'next';
import '../styles/globals.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import Header from '../components/Header';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Header />
        <Component {...pageProps} />
      </Layout>
    </QueryClientProvider>
  );
}

export default MyApp;
