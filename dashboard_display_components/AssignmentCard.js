import React from "react";
import styles from "./AssignmentCard.module.css";
import Image from "next/image";

function Assignment() {
  return (
    <div className={styles.assignment_body}>
      <span className={styles.container}>
        <span className={styles.subject_div}>
          <h4>Maths Assignment</h4>
        </span>
        <span className={styles.date_div}>
          <span className={styles.date_icon_div}>
            <Image
              width="22px"
              height="25px"
              src="/dashboard-display-date.svg"
              alt="dashboard-display-date"
            />
          </span>

          <h4>19-02-2018</h4>
        </span>
      </span>

      <span className={styles.button_div}>
        <button><Image
              width="22px"
              height="25px"
              src="/dashboard-display-button.svg"
              alt="dashboard-display-button"
            /></button>
      </span>
    </div>
  );
}

export default Assignment;
