import "../styles/globals.css";
import dynamic from "next/dynamic";
import Head from "next/head";
import Layout from "../layout/Layout";
const Ellipse = dynamic(() => import("../components/Ellipse"));
import Loading from "../components/Loading";
import { Provider } from "next-auth/client";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import firebase from "../lib/initFirebase";

firebase();

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  let state;
  if (router.pathname === "/") {
    state = true;
  } else {
    state = false;
  }
  const [initialLoading, setInitialLoading] = useState(state);
  if (router.pathname === "/") {
    setTimeout(() => {
      setInitialLoading(false);
    }, 2000);
  }

  useEffect(() => {
    const handleStart = (url) => {
      url !== router.pathname ? setLoading(true) : setLoading(false);
      // console.log(router.pathname, router.asPath, url);
    };
    const handleComplete = (url) => setLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);
  }, [router]);

  return (
    <>
      <Provider session={pageProps.session}>
        {router.pathname === "/" ? (
          <Loading loading={initialLoading} />
        ) : (
          <Loading loading={loading} />
        )}

        <Layout loading={loading} initialLoading={initialLoading}>
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
      </Provider>
    </>
  );
}
export default MyApp;
