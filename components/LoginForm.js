import React from "react";
import Input from "../components/Input";
import Label from "../components/Label";
import FormButton from "../components/FormButton";
import styles from "./LoginForm.module.css";
import { useState} from "react";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [reset, setReset] = useState(false);

  function usernameHandler(data) {
    setUsername(data);
  }
  function passwordHandler(data) {
    setPassword(data);
  }

  function LoginFormHandler(event) {
    event.preventDefault();
    console.log("Form Submitted Successfully");
    console.log(username);
    console.log(password);
    event.target.reset();
    setReset(true);
    setTimeout(() => {
      setReset(false);
    }, 1000);
  }
  return (
    <div className={styles.login_form}>
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
    </div>
  );
}

export default LoginForm;
