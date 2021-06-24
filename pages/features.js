import React from "react";
import Image from "next/image";
import styles from "../styles/features.module.css";

function FeaturesPage() {
  return (
    <>
      <div className={styles.body_features}>
        <div className={styles.heading_div}>
          <h1>Features</h1>
        </div>
        <div className={styles.points_div}>
          <ul>
            <li>
              All in one platform for teachers and students to work on
              assignments.
            </li>
            <li>Share assignments in few minutes.</li>
            <li>Notification for every assignment shared.</li>
            <li>Grade assignments and generate report.</li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default FeaturesPage;
