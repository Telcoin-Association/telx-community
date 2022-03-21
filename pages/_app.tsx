import type { NextPage } from "next";
import { AppProps } from "next/app";
import Head from "next/head";
import React from "react";
import type { ReactElement, ReactNode } from "react";
import Layout from "../components/layout/Layout";
import "../sass/style.scss";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function getDefaultLayout(page: ReactElement, pageProps: any) {
  return <Layout {...pageProps}>{page}</Layout>;
}

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout =
    Component.getLayout ?? ((page) => getDefaultLayout(page, pageProps));
  return (
    <>
      <Head>
        <title>TELx Community</title>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>

      
      {getLayout(<Component {...pageProps} />)}      

      {/* Global site tag (gtag.js) - Google Analytics */}
      {/* <Script
        src="https://www.googletagmanager.com/gtag/js?id=GTM-KTCWXCG"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'GTM-KTCWXCG');
        `}
      </Script> */}
    </>
  );
}
