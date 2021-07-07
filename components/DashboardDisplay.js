import React from "react";
import styles from "./DashboardDisplay.module.css";
import StudentHome from "../dashboard_display_components/StudentHome";

function DashboardDisplay() {
  return (
    <div className={styles.display_main}>
      <StudentHome />
    </div>
  );
}

export default DashboardDisplay;
