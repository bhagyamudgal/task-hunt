import React from "react";
import Image from "next/image";
import styles from "./DashboardNavigation.module.css";
import { signOut } from "next-auth/client";
import { useRouter } from "next/router";
import Link from "next/link";
function DashboardNavigation(props) {
  const router = useRouter();
  function logoutHandler() {
    signOut();
  }
  return (
    <>
      <div className={styles.navigation}>
        <div className={styles.navigation_item_body}>
          <Link href="/dashboard" passHref>
            <span
              tabIndex="0"
              className={
                router.pathname === "/dashboard"
                  ? styles.item_span_focus
                  : styles.item_span
              }
            >
              <Image
                width="40px"
                height="40px"
                src="/dashboard-home.svg"
                alt="dashboard-navigation-home-button"
              />
              <span className={styles.tooltip_text}>Home</span>
            </span>
          </Link>
          <Link href="/dashboard/assignments" passHref>
            <span
              tabIndex="0"
              className={
                router.pathname === "/dashboard/assignments"
                  ? styles.item_span_focus
                  : styles.item_span
              }
            >
              <Image
                width="40px"
                height="40px"
                src="/dashboard-assignments.svg"
                alt="dashboard-navigation-assignments-button"
              />
              <span className={styles.tooltip_text}>Assignments</span>
            </span>
          </Link>
          {props.usertype === "teacher" && (
            <Link href="/dashboard/reports" passHref>
              <span
                tabIndex="0"
                className={
                  router.pathname === "/dashboard/reports"
                    ? styles.item_span_focus
                    : styles.item_span
                }
              >
                <Image
                  width="40px"
                  height="40px"
                  src="/dashboard-reports.svg"
                  alt="dashboard-navigation-reports-button"
                />
                <span className={styles.tooltip_text}>Reports</span>
              </span>
            </Link>
          )}
          <Link href="/dashboard/settings" passHref>
            <span
              tabIndex="0"
              className={
                router.pathname === "/dashboard/settings"
                  ? styles.item_span_focus
                  : styles.item_span
              }
            >
              <Image
                width="40px"
                height="40px"
                src="/dashboard-settings.svg"
                alt="dashboard-navigation-settings-button"
              />
              <span className={styles.tooltip_text}>Settings</span>
            </span>
          </Link>
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
          <span className={styles.tooltip_text}>Logout</span>
        </span>
      </div>
    </>
  );
}

export default DashboardNavigation;
