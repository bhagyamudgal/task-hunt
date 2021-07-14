import React from "react";
import styles from "./DisplayButton.module.css";

function DisplayButton(props) {
  return (
    <div className={styles.display_button}>
      <h2>{props.text}</h2>
    </div>
  );
}

export default DisplayButton;
