import React from "react";
import Input from "../components/Input";
import Label from "../components/Label";
import FormButton from "../components/FormButton";
import LoadingForm from "../components/LoadingForm";
import styles from "./LoginForm.module.css";
import { signIn } from "next-auth/client";
import { useRouter } from "next/router";
import Image from "next/image";

import { useState } from "react";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [messageToggle, setMessageToggle] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [eye, setEye] = useState(false);
  const [type, setType] = useState("password");

  function usernameHandler(event) {
    setUsername(event.target.value);
  }

  function passwordHandler(event) {
    setPassword(event.target.value);
  }

  const router = useRouter();

  function eyeHandler() {
    if (eye === false) {
      setType("text");
      setEye(true);
    } else {
      setType("password");
      setEye(false);
    }
  }

  async function LoginFormHandler(event) {
    event.preventDefault();
    setMessageToggle(false);
    setLoading(true);
    const result = await signIn("credentials", {
      redirect: false,
      username: username,
      password: password,
    });
    if (result.error === "No User Found.") {
      setLoading(false);
      setMessage(result.error);
      setMessageToggle(true);
    } else if (result.error === "Invalid Password.") {
      setLoading(false);
      setMessage(result.error);
      setMessageToggle(true);
    } else {
      event.target.reset();
      setUsername("");
      setPassword("");
      setLoading(false);
      setTimeout(() => {
        router.replace(`/dashboard`);
      }, 1000);
    }
  }
  return (
    <div className={styles.login_form}>
      {messageToggle && <div className={styles.message_div}>{message}</div>}

      {loading ? (
        <LoadingForm />
      ) : (
        <form
          id="studentSignupForm"
          onSubmit={LoginFormHandler}
          className={styles.form}
          autoComplete="off"
        >
          <div className={styles.form_elements}>
            <Label for="username" text="Username"></Label>
            <input
              id="username"
              name="username"
              className={styles.input}
              type="text"
              required
              onChange={usernameHandler}
              value={username}
            />
            <div className={styles.none}>
              <Image
                width="20px"
                height="20px"
                src="/eye-icon.png"
                alt="eye-icon"
              />
            </div>
          </div>
          <div className={styles.form_elements}>
            <Label for="password" text="Password"></Label>

            <input
              id="password"
              className={styles.input}
              name="password"
              type={type}
              required
              onChange={passwordHandler}
              value={password}
            />
            <div className={styles.eye} onClick={eyeHandler}>
              {eye ? (
                <Image
                  width="20px"
                  height="20px"
                  src="/eye-icon.png"
                  alt="eye-icon"
                />
              ) : (
                <Image
                  width="20px"
                  height="20px"
                  src="/close-eye-icon.png"
                  alt="close-eye-icon"
                />
              )}
            </div>
          </div>
          <div className={styles.form_elements}>
            <FormButton type="submit" text="Login"></FormButton>
          </div>
        </form>
      )}
    </div>
  );
}

export default LoginForm;
