import React from "react";
import styles from "./LayoutDashboard.module.css";
import DashboardNavigation from "../components/DashboardNavigation";
import Image from "next/image";
import { useRouter } from "next/router";

function LayoutDashboard(props) {
  const router = useRouter();
  return (
    <>
      <div className={styles.body}>
        <div className={styles.header}>
          <div>
            <div className={styles.logo} />
          </div>
        </div>
        <main className={styles.main}>
          {router.pathname !== "/dashboard/new-user" && (
            <DashboardNavigation usertype={props.usertype} />
          )}
          {props.children}
        </main>
      </div>
    </>
  );
}

export default LayoutDashboard;
