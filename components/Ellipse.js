import React from "react";
import Image from "next/image";
import styles from "../components/Ellipse.module.css";
import { useRouter } from "next/router";

function Ellipse() {
  const router = useRouter();
  return (
    <div className={styles.body_ellipse}>
      {router.pathname === "/features" && (
        <Image
          width="435"
          height="791"
          src="/ellipse_features.svg"
          alt="ellipse_features"
        />
      )}
      {router.pathname === "/contact" && (
        <Image
          width="435"
          height="791"
          src="/ellipse_contact.svg"
          alt="ellipse_contact"
        />
      )}
      
    </div>
  );
}

export default Ellipse;
