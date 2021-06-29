import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "../components/Button.module.css";

function Button(props) {
  const router = useRouter();
  const [boxShadow, setBoxShadow] = useState(props.boxshadow);
  const [boxType, setBoxType] = useState(props.boxtype);
  return (
    <Link href={props.target} passHref>
      <button
        type="button"
        className={`${boxType ? styles.button : styles.button_navigation} ${
          boxShadow ? styles.box_shadow : " "
        } ${router.pathname === "/signup" && styles.width}`}
        style={{ width: props.width }}
      >
        {props.text}
      </button>
    </Link>
  );
}

export default Button;
