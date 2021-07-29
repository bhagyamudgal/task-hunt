import React from "react";
import styles from "./DisplayButton.module.css";

function DisplayButton(props) {
  return (
    <span className={styles.display_button} onClick={props.onClick}>
      <h2>{props.text}</h2>
    </span>
  );
}

export default DisplayButton;
