import styles from "./ChangePassword.module.css";
import LoadingForm from "../components/LoadingForm";
import Label from "../components/Label";
import { useState } from "react";
import Image from "next/image";
import { changePasswordDetailsActions } from "../store/index";
import { useDispatch } from "react-redux";

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

  const [successToggle, setSuccessToggle] = useState(false);
  const [errorResponse, setErrorResponse] = useState(false);
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  function detailsHandler() {
    dispatch(
      changePasswordDetailsActions.setDisplayChangePasswordDetails(false)
    );
  }

  function oldPasswordHandler(event) {
    setOldPassword(event.target.value);
  }
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
    // console.log(oldPassword);
    // console.log(newPassword);
    // console.log(confirmNewPassword);

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
      setType3("password");
      setEye3(false);

      const response = await fetch("/api/auth/changePassword", {
        method: "PATCH",
        body: JSON.stringify({
          oldPassword,
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
        setOldPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
        setLoading(false);
        setMessage(data.message);
        setSuccessToggle(true);
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

                <button
                  type="button"
                  className={styles.button}
                  onClick={detailsHandler}
                >
                  Back
                </button>
              </div>
            </div>
          ) : (
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
                  value={oldPassword}
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
                  value={newPassword}
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
                <Label
                  for="confirmnewpassword"
                  text="Confirm New Password"
                ></Label>
                <input
                  id="confirmnewpassword"
                  name="confirmnewpassword"
                  type={type3}
                  required
                  onChange={confirmNewPasswordHandler}
                  value={confirmNewPassword}
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
                <button
                  className={styles.button}
                  type="button"
                  onClick={detailsHandler}
                >
                  Back
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </>
  );
}

export default ChangePassword;
