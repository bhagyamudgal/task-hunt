import React from "react";
import Navigation from "../components/Navigation";
import { useState } from "react";
import { useRouter } from "next/router";

function Layout(props) {
  const router = useRouter();
  return (
    <>
      {(router.pathname === "/") ? (
        <div onLoad={props.onload} className="body_home">
          <Navigation></Navigation>
          <main className="main">{props.children}</main>
        </div>
      ) : (
        <div>
          <Navigation></Navigation>
          <main className="main">{props.children}</main>
        </div>
      )}

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
      `}</style>
    </>
  );
}

export default Layout;
