import React from "react";
import Navigation from "../components/Navigation";

import { useRouter } from "next/router";

function Layout(props) {
  const router = useRouter();
  return (
    <div
      className={`${router.pathname === "/" && "body_home"}`}
    >
      <Navigation></Navigation>
      <main className="main">{props.children}</main>
      <style jsx>{`
        .body_home {
          background-image: url(/background.png);
          background-repeat: no-repeat;
          background-size: cover;
          min-height: 100vh;
        }
        .main{
          overflow: overlap;
        }}
      `}</style>
    </div>
  );
}

export default Layout;
