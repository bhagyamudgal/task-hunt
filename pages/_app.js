import "../styles/globals.css";
import Head from "next/head";
import Layout from "../layout/Layout";
import Ellipse from "../components/Ellipse";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  return (
    <Layout>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
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
  );
}

export default MyApp;
