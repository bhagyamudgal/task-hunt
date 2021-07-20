import styles from "./NewPassword.module.css";
import LoadingForm from "../components/LoadingForm";
import Label from "../components/Label";
import { useState } from "react";
import { signOut } from "next-auth/client";
import Image from "next/image";
import { useRouter } from "next/router";

function NewPassword() {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [errorMessage, seterrorMessage] = useState("");
  const [errorToggle, seterrorToggle] = useState(false);
  const [loading, setLoading] = useState(false);
  const [eye1, setEye1] = useState(false);
  const [eye2, setEye2] = useState(false);

  const [type1, setType1] = useState("password");
  const [type2, setType2] = useState("password");

  const [successToggle, setSuccessToggle] = useState(false);
  const [errorResponse, setErrorResponse] = useState(false);
  const [message, setMessage] = useState("");

  function newPasswordHandler(event) {
    setNewPassword(event.target.value);
  }
  function confirmNewPasswordHandler(event) {
    setConfirmNewPassword(event.target.value);
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

  async function newPasswordFormHandler(event) {
    event.preventDefault();
    console.log(newPassword);
    console.log(confirmNewPassword);

    if (newPassword !== confirmNewPassword) {
      seterrorToggle(true);
      seterrorMessage("Confirm Password doesn't match with new Password");
    } else {
      setLoading(true);
      seterrorMessage("");
      seterrorToggle(false);
      setType1("password");
      setEye1(false);
      setType2("password");
      setEye2(false);

      const response = await fetch("/api/auth/newPassword", {
        method: "PATCH",
        body: JSON.stringify({
          newPassword,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (!response.ok) {
        setMessage(data.message);
        setLoading(false);
        setErrorResponse(true);
        setSuccessToggle(true);
      } else {
        setErrorResponse(false);
        setNewPassword("");
        setConfirmNewPassword("");
        setLoading(false);
        setMessage(data.message);
        setSuccessToggle(true);
        setTimeout(() => {
          signOut();
        }, 4000);
      }
    }
  }

  return (
    <>
      {loading ? (
        <div className={styles.center}>
          <LoadingForm />
        </div>
      ) : (
        <div className={styles.body}>
          {errorToggle && (
            <div className={styles.error_div}>
              <h3>{errorMessage}</h3>
            </div>
          )}
          {successToggle ? (
            <div className={styles.center}>
              <div
                className={
                  errorResponse ? styles.error_response_div : styles.success_div
                }
              >
                <h3>{message}</h3>
              </div>
            </div>
          ) : (
            <form
              id="newPasswordForm"
              onSubmit={newPasswordFormHandler}
              className={styles.form}
              autoComplete="off"
            >
              <div className={styles.form_elements}>
                <Label for="newPassword" text="New Password"></Label>
                <input
                  id="newPassword"
                  name="newPassword"
                  type={type1}
                  required
                  onChange={newPasswordHandler}
                  value={newPassword}
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
                <Label
                  for="confirmnewpassword"
                  text="Confirm New Password"
                ></Label>
                <input
                  id="confirmnewpassword"
                  name="confirmnewpassword"
                  type={type2}
                  required
                  onChange={confirmNewPasswordHandler}
                  value={confirmNewPassword}
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
                <button className={styles.button} type="submit">
                  Change Password
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </>
  );
}

export default NewPassword;
