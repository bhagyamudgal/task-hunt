import React from "react";
import Input from "../components/Input";
import Label from "../components/Label";
import FormButton from "../components/FormButton";
import LoadingForm from "../components/LoadingForm";
import styles from "./LoginForm.module.css";
import { signIn } from "next-auth/client";
import { useRouter } from "next/router";

import { useState } from "react";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [messageToggle, setMessageToggle] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [reset, setReset] = useState(false);

  const router = useRouter();

  function usernameHandler(data) {
    setUsername(data);
  }
  function passwordHandler(data) {
    setPassword(data);
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
      setReset(true);
      setTimeout(() => {
        setReset(false);
      }, 1000);
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
            <Input
              id="username"
              name="username"
              type="text"
              required="true"
              height="40px"
              width="80%"
              value={usernameHandler}
              reset={reset}
            />
          </div>
          <div className={styles.form_elements}>
            <Label for="password" text="Password"></Label>
            <Input
              id="password"
              name="password"
              type="password"
              required="true"
              height="40px"
              width="80%"
              value={passwordHandler}
              reset={reset}
            />
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
