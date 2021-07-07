import React from "react";
import styles from "./Loading.module.css";
import { useRouter } from "next/router";

function Loading(props) {
  const router = useRouter();
  return (
    <div className={props.loading ? styles.body_loading : styles.none}>
      <div
        className={
          router.pathname === "/" ||
          router.pathname === "/features" ||
          router.pathname === "/contact" ||
          router.pathname === "/login" ||
          router.pathname === "/signup"
            ? styles.lds_ellipsis
            : styles.lds_ellipsis_red
        }
      >
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default Loading;
