import React from "react";
import styles from "./LoadingForm.module.css";

function LoadingForm(props) {
  return (
    <div className={styles.body_loading}>
      <div className={styles.lds_ellipsis}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default LoadingForm;
