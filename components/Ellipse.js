import React from "react";
import Image from "next/image";
import styles from "../components/Ellipse.module.css";
import { useRouter } from "next/router";

function Ellipse() {
  const router = useRouter();
  return (
    <div className={`${router.pathname==="/signup" ? styles.body_ellipse_signup : styles.body_ellipse}`}>
      {router.pathname === "/features" && (
        <Image
          width="435"
          height="791"
          src="/ellipse_features.jpg"
          alt="ellipse_features"
        />
      )}
      {router.pathname === "/contact" && (
        <Image
          width="435"
          height="791"
          src="/ellipse_contact.jpg"
          alt="ellipse_contact"
        />
      )}
      {router.pathname === "/signup" && (
        <Image
          width="435"
          height="791"
          src="/ellipse_signup.jpg"
          alt="ellipse_signup"
        />
      )}
      {router.pathname === "/login" && (
        <Image
          width="435"
          height="791"
          src="/ellipse_signup.jpg"
          alt="ellipse_signup"
        />
      )}
    </div>
  );
}

export default Ellipse;
