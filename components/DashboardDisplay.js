import React from "react";
import styles from "./DashboardDisplay.module.css";
import { useRouter } from "next/router";

function DashboardDisplay(props) {
  const router = useRouter();
  return (
    <div
      className={`${styles.display_main} ${
        router.pathname !== "dashboard" && styles.width
      }`}
    >
      {props.children}
    </div>
  );
}

export default DashboardDisplay;
