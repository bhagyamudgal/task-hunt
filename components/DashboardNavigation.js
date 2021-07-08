import React from "react";
import Image from "next/image";
import styles from "./DashboardNavigation.module.css";
import { signOut } from "next-auth/client";

function DashboardNavigation() {
  function logoutHandler() {
    signOut();
  }
  return (
    <>
      <div className={styles.navigation}>
        <div className={styles.navigation_item_body}>
          <span tabIndex="0" className={styles.item_span}>
            <Image
              width="40px"
              height="40px"
              src="/dashboard-home.svg"
              alt="dashboard-navigation-home-button"
            />
          </span>
          <span tabIndex="0" className={styles.item_span}>
            <Image
              width="40px"
              height="40px"
              src="/dashboard-assignments.svg"
              alt="dashboard-navigation-assignments-button"
            />
          </span>
          <span tabIndex="0" className={styles.item_span}>
            <Image
              width="40px"
              height="40px"
              src="/dashboard-settings.svg"
              alt="dashboard-navigation-settings-button"
            />
          </span>
        </div>
        <span
          tabIndex="0"
          className={styles.item_span_end}
          onClick={logoutHandler}
        >
          <Image
            width="40px"
            height="40px"
            src="/dashboard-exit.svg"
            alt="dashboard-navigation-exit-button"
          />
        </span>
      </div>
    </>
  );
}

export default DashboardNavigation;
