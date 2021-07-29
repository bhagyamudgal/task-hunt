import React from "react";
import styles from "./DashboardProfile.module.css";

function DashboardProfile(props) {
  return (
    <div className={styles.profile_main}>
      {props.usertype === "student" && (
        <>
          <div className={styles.name}>
            <h3>{props.name}</h3>
          </div>
          <div className={styles.course}>
            <h4>Course : {props.course}</h4>
          </div>
          <div className={styles.year}>
            <h4>Year : {props.year}</h4>
          </div>
          <div className={styles.semester}>
            <h4>Semester : {props.semester}</h4>
          </div>
          <div className={styles.organization}>
            <h4>{props.organization}</h4>
          </div>
        </>
      )}
      {props.usertype === "teacher" && (
        <>
          <div className={styles.name}>
            <h3>{props.name}</h3>
          </div>
          <div className={styles.post}>
            <h4>Post : {props.post}</h4>
          </div>
          <div className={styles.subject}>
            <h4>Subject : {props.subject}</h4>
          </div>
          <div className={styles.organization}>
            <h4>{props.organization}</h4>
          </div>
        </>
      )}
    </div>
  );
}

export default DashboardProfile;
