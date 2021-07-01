import React from "react";
import LoginForm from "../components/LoginForm";
import styles from "../styles/login.module.css";

function LoginPage() {
  return (
    <div className={styles.body_login}>
      <div className={styles.main_div}>
        <div className={styles.heading_div}>
          <h1>Login</h1>
        </div>
      </div>

      <LoginForm />
    </div>
  );
}

export default LoginPage;
