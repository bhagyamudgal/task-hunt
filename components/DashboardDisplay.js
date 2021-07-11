import React from "react";
import styles from "./DashboardDisplay.module.css";
import StudentAssignments from "../dashboard_display_components/StudentAssignments";
import AssignmentBody from "../dashboard_display_components/AssignmentBody";
import { useRouter } from "next/router";

function DashboardDisplay() {
  const router = useRouter();
  return (
    <div
      className={`${styles.display_main} ${
        router.pathname !== "dashboard" && styles.width
      }`}
    >
      {router.pathname === "/dashboard" && <StudentAssignments />}
      {router.pathname === "/dashboard/assignments" && <AssignmentBody />}
    </div>
  );
}

export default DashboardDisplay;
