import "../styles/globals.css";
import Head from "next/head";
import Layout from "../layout/Layout";
import Ellipse from "../components/Ellipse";
import Loading from "../components/Loading";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  function loadingHandler() {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }

  useEffect(() => {
    const handleStart = (url) => {
      url !== router.asPath && setLoading(true);
    };

    const handleComplete = (url) => {
      setTimeout(() => {
        router.isReady && setLoading(false);
      }, 1000);
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  });

  return (
    <>
      {loading && <Loading />}
      <Layout onload={loadingHandler}>
        <Head>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
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
          <link rel="manifest" href="/site.webmanifest" />
        </Head>
        {router.pathname === "/features" && <Ellipse></Ellipse>}
        {router.pathname === "/contact" && <Ellipse></Ellipse>}
        {router.pathname === "/signup" && <Ellipse></Ellipse>}
        {router.pathname === "/login" && <Ellipse></Ellipse>}
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
export default MyApp;
