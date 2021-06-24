import "../styles/globals.css";
import Layout from "../layout/Layout";
import Ellipse from "../components/Ellipse";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  return (
    <Layout>
      {router.pathname === "/features" && <Ellipse></Ellipse>}
      {router.pathname === "/contact" && <Ellipse></Ellipse>}
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
