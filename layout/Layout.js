import React from "react";
import Navigation from "../components/Navigation";
import { useRouter } from "next/router";

function Layout(props) {
  const router = useRouter();
  return (
    <>
      <div
        onLoad={props.onload()}
        className={`${props.loading ? "none" : "block"} ${
          router.pathname === "/" && "body_home"
        }`}
      >
        <style jsx>{`
          .body_home {
            background-image: url(/background.jpg);
            background-repeat: no-repeat;
            background-size: cover;
            min-height: 100vh;
          }
          .none {
            display: none;
          }
          .block {
            display: block;
          }
          .main {
            position: relative;
            overflow: hidden;
          }
        `}</style>
        {(router.pathname === "/" ||
          router.pathname === "/features" ||
          router.pathname === "/contact" ||
          router.pathname === "/login" ||
          router.pathname === "/signup") && <Navigation></Navigation>}
        <main className="main">{props.children}</main>
      </div>
    </>
  );
}

export default Layout;
