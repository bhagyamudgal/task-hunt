import React from "react";
import styles from "./ChangePassword.module.css";
import Input from "../components/Input";
import Link from "next/link";
import LoadingForm from "../components/LoadingForm";
import Label from "../components/Label";
import { useState, useRef } from "react";
import Image from "next/image";

function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [errorMessage, seterrorMessage] = useState("");
  const [errorToggle, seterrorToggle] = useState(false);
  const [loading, setLoading] = useState(false);
  const [eye1, setEye1] = useState(false);
  const [eye2, setEye2] = useState(false);
  const [eye3, setEye3] = useState(false);
  const [type1, setType1] = useState("password");
  const [type2, setType2] = useState("password");
  const [type3, setType3] = useState("password");

  const [reset, setReset] = useState(false);
  const [successToggle, setSuccessToggle] = useState(false);
  const [errorResponse, setErrorResponse] = useState(false);
  const [errorResponseMessage, setErrorResponseMessage] = useState("");

  function oldPasswordHandler(data) {
    setOldPassword(data);
  }
  function newPasswordHandler(data) {
    setNewPassword(data);
  }
  function confirmNewPasswordHandler(data) {
    setConfirmNewPassword(data);
  }

  function eye1Handler() {
    if (eye1 === false) {
      setType1("text");
      setEye1(true);
    } else {
      setType1("password");
      setEye1(false);
    }
  }
  function eye2Handler() {
    if (eye2 === false) {
      setType2("text");
      setEye2(true);
    } else {
      setType2("password");
      setEye2(false);
    }
  }
  function eye3Handler() {
    if (eye3 === false) {
      setType3("text");
      setEye3(true);
    } else {
      setType3("password");
      setEye3(false);
    }
  }

  async function changePasswordFormHandler(event) {
    event.preventDefault();
    seterrorToggle(false);
    setLoading(true);
    const response = await fetch("/api/auth/studentSignup", {
      method: "POST",
      body: JSON.stringify({
        studentID,
        name,
        email,
        gender,
        course,
        year,
        semester,
        organization,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      setLoading(false);
      setErrorResponseMessage(data.message);
      setErrorResponse(true);
      setSuccessToggle(true);
    } else {
      event.target.reset();
      setLoading(false);
      setSuccessToggle(true);
      setReset(true);
      setTimeout(() => {
        setReset(false);
      }, 1000);
    }
  }

  return (
    <div className={styles.body}>
      <form
        id="changePasswordForm"
        onSubmit={changePasswordFormHandler}
        className={styles.form}
        autoComplete="off"
      >
        <div className={styles.form_elements}>
          <Label for="oldpassword" text="Old Password"></Label>
          <input
            id="oldpassword"
            name="oldpassword"
            type={type1}
            required
            onChange={oldPasswordHandler}
            reset={reset}
            className={styles.input}
          />

          <div className={styles.eye} onClick={eye1Handler}>
            {eye1 ? (
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
          <Label for="newpassword" text="New Password"></Label>
          <input
            id="newpassword"
            name="newpassword"
            type={type2}
            required
            onChange={newPasswordHandler}
            reset={reset}
            className={styles.input}
          />

          <div className={styles.eye} onClick={eye2Handler}>
            {eye2 ? (
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
          <Label for="confirmnewpassword" text="Confirm New Password"></Label>
          <input
            id="confirmnewpassword"
            name="confirmnewpassword"
            type={type3}
            required
            onChange={confirmNewPasswordHandler}
            reset={reset}
            className={styles.input}
          />

          <div className={styles.eye} onClick={eye3Handler}>
            {eye3 ? (
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
          <button className={styles.button} type="submit">
            Submit
          </button>
          <button className={styles.button} type="button">
            Back
          </button>
        </div>
      </form>
    </div>
  );
}

export default ChangePassword;
