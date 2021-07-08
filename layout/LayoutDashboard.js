import React from "react";
import styles from "./LayoutDashboard.module.css";
import DashboardNavigation from "../components/DashboardNavigation";
import DashboardDisplay from "../components/DashboardDisplay";
import DashboardProfile from "../components/DashboardProfile";
import Image from "next/image";

function LayoutDashboard(props) {
  return (
    <>
      <div className={styles.body}>
        <div className={styles.header}>
          <div>
            <div className={styles.logo} />
          </div>
        </div>
        <main className={styles.main}>
          <DashboardNavigation />
          <DashboardDisplay />
          <DashboardProfile text="Bhagya Mudgal"/>
        </main>
        <div className={styles.waves_div}>
          <Image
            width="2560px"
            height="250px"
            src="/waves-bottom.svg"
            alt="waves-bottom"
          />
        </div>
      </div>
    </>
  );
}

export default LayoutDashboard;
