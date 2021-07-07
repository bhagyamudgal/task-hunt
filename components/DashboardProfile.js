import React from "react";
import styles from "./DashboardProfile.module.css";

function DashboardProfile(props) {
  return (
    <div className={styles.profile_main}>
      <h3>Hi, {props.text}</h3>
    </div>
  );
}

export default DashboardProfile;
