import React from "react";
import styles from "../components/TeacherSignupForm.module.css";
import Input from "../components/Input";
import LoadingForm from "../components/LoadingForm";
import Label from "../components/Label";
import FormButton from "../components/FormButton";
import { useState, useRef } from "react";
import Link from "next/link";

function TeacherSignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [reset, setReset] = useState(false);
  const [errorMessage, seterrorMessage] = useState("");
  const [errorToggle, seterrorToggle] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successToggle, setSuccessToggle] = useState(false);
  const [errorResponse, setErrorResponse] = useState(false);
  const [errorResponseMessage, setErrorResponseMessage] = useState("");
  const subjectRef = useRef();
  const postRef = useRef();
  const organizationRef = useRef();

  function nameHandler(data) {
    setName(data);
  }
  function emailHandler(data) {
    setEmail(data);
  }
  function genderHandler(event) {
    setGender(event.target.value);
  }

  async function teacherSignupFormHandler(event) {
    event.preventDefault();
    let subject;
    let post;
    let organization;
    if (subjectRef.current.value === "SELECT") {
      seterrorMessage("Please Select Subject");
      seterrorToggle(true);
    } else {
      seterrorToggle(false);
      subject = subjectRef.current.value;
      if (postRef.current.value === "SELECT") {
        seterrorMessage("Please Select Post");
        seterrorToggle(true);
      } else {
        seterrorToggle(false);
        post = postRef.current.value;
        if (organizationRef.current.value === "SELECT") {
          seterrorMessage("Please Select Organization");
          seterrorToggle(true);
        } else {
          seterrorToggle(false);
          organization = organizationRef.current.value;
          setLoading(true);
          const response = await fetch("/api/auth/teacherSignup", {
            method: "POST",
            body: JSON.stringify({
              name,
              email,
              gender,
              subject,
              post,
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
      }
    }
  }
  return (
    <div className={styles.teacherSignup_form}>
      {successToggle ? (
        errorResponse ? (
          <div className={styles.errorResponse_div}>
            <h3>{errorResponseMessage}</h3>
            <Link href="/login" passHref>
              <button type="button" className={styles.button}>
                Login Now
              </button>
            </Link>
          </div>
        ) : (
          <div className={styles.success_div}>
            <h3>
              Registration Successfull, Check your email for Username and
              Password.
            </h3>
            <Link href="/login" passHref>
              <button type="button" className={styles.button}>
                Login Now
              </button>
            </Link>
          </div>
        )
      ) : loading ? (
        <LoadingForm />
      ) : (
        <form
          id="teacherSignupForm"
          onSubmit={teacherSignupFormHandler}
          className={styles.form}
          autoComplete="off"
        >
          {errorToggle && (
            <div className={styles.error_div}>
              <h4>*{errorMessage}</h4>
            </div>
          )}
          <div
            className={`${styles.form_elements} ${styles.form_element_width}`}
          >
            <Label for="name" text="Name"></Label>
            <Input
              id="name"
              name="name"
              type="text"
              required="true"
              height="40px"
              width="80%"
              value={nameHandler}
              reset={reset}
            />
          </div>
          <div
            className={`${styles.form_elements} ${styles.form_element_width}`}
          >
            <Label for="email" text="Email"></Label>
            <Input
              id="email"
              name="email"
              type="email"
              required="true"
              height="40px"
              width="80%"
              value={emailHandler}
              reset={reset}
            />
          </div>
          <div
            className={`${styles.form_elements} ${styles.form_element_radio}`}
          >
            <Label for="gender" text="Gender"></Label>
            <div className={styles.radio_group}>
              <div>
                <input
                  className={styles.radio_button}
                  type="radio"
                  id="male"
                  name="gender"
                  value="Male"
                  onChange={genderHandler}
                  required
                />
                <Label for="male" text="Male"></Label>
              </div>
              <div>
                <input
                  className={styles.radio_button}
                  type="radio"
                  id="female"
                  name="gender"
                  value="Female"
                  onChange={genderHandler}
                  required
                />
                <Label for="female" text="Female"></Label>
              </div>
              <div>
                <input
                  className={styles.radio_button}
                  type="radio"
                  id="other"
                  name="gender"
                  value="Other"
                  onChange={genderHandler}
                  required
                />
                <Label for="other" text="Other"></Label>
              </div>
            </div>
          </div>
          <div className={styles.form_elements}>
            <Label for="subject" text="Subject"></Label>
            <select
              name="subject"
              id="subject"
              className={styles.select}
              ref={subjectRef}
              required
            >
              <option value="SELECT">SELECT</option>
              <option value="Maths">Maths</option>
              <option value="Computer Networks">Computer Networks</option>
              <option value="DSA">DSA</option>
              <option value="FIT">FIT</option>
            </select>
          </div>
          <div className={styles.form_elements}>
            <Label for="post" text="Post"></Label>
            <select
              name="post"
              id="post"
              className={styles.select}
              ref={postRef}
              required
            >
              <option value="SELECT">
                SELECT
              </option>
              <option value="Head Of Department">Head Of Department</option>
              <option value="Associate Professor">Associate Professor</option>
              <option value="Assistant Professor">Assistant Professor</option>
            </select>
          </div>
          <div
            className={`${styles.form_elements} ${styles.form_element_organization}`}
          >
            <Label for="organization" text="Organization"></Label>
            <select
              name="organization"
              id="organization"
              className={styles.organization}
              ref={organizationRef}
              required
            >
              <option value="SELECT">SELECT</option>
              <option value="Maharaja Surajmal Institute">
                Maharaja Surajmal Institute
              </option>
              <option value="Vivekanand Institute Of Professional Studies">
                Vivekanand Institute Of Professional Studies
              </option>
              <option value="Trinity Institute Of Professional Studies">
                Trinity Institute Of Professional Studies
              </option>
              <option value="Institute Of Information Technology And Management">
                Institute Of Information Technology And Management
              </option>
            </select>
          </div>
          <div className={styles.form_elements}>
            <FormButton type="submit" text="Register"></FormButton>
          </div>
        </form>
      )}
    </div>
  );
}

export default TeacherSignupForm;
