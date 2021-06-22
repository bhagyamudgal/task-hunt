import React from "react";
import Link from "next/link";
import { useState } from "react";
import styles from "../components/Button.module.css";

function Button(props) {

  const [boxShadow, setBoxShadow] = useState(props.boxshadow);
  const [boxType, setBoxType] = useState(props.boxtype);
  return (
    <Link href={props.target} passHref>
      <button
        type="button"
        className={`${boxType ? styles.button : styles.button_navigation} ${boxShadow ? styles.box_shadow : " "}`}
        style={{ width: props.width}}
      >{props.text}</button>
    </Link>
  );
}

export default Button;
