import React from "react";
import Link from "next/link";
import styles from "../components/Button.module.css";

function Button(props) {
  return (
    <Link href={props.target} passHref>
      <button
        type="button"
        className={styles.button}
        style={{ width: props.width }}
      >{props.text}</button>
    </Link>
  );
}

export default Button;
