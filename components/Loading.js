import React from "react";
import styles from "./Loading.module.css";
import Image from "next/image";
import Link from "next/link";

function Loading() {
  return (
    <div className={styles.body_loading}>
      <div className={styles.lds_ellipsis}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default Loading;
