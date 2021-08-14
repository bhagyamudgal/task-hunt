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
    let subject = subjectRef.current.value;
    let post = postRef.current.value;
    let organization = organizationRef.current.value;
    setLoading(true);
    const response = await fetch("/api/teacherSignup", {
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
              defaultValue=""
              required
            >
              <option value="" disabled>
                Select
              </option>
              <option value="Mathematics">Mathematics</option>
              <option value="Computer Networks">Computer Networks</option>
              <option value="Data Structures and Algorithms">
                Data Structures and Algorithms
              </option>
              <option value="Foundation of Information Technology">
                Foundation of Information Technology
              </option>
              <option value="OOPS with C++">OOPS with C++</option>
              <option value="Java">Java</option>
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
              defaultValue=""
            >
              <option value="" disabled>
                Select
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
              defaultValue=""
              required
            >
              <option value="" disabled>
                Select
              </option>
              <option value="Maharaja Surajmal Institute">
                Maharaja Surajmal Institute
              </option>
              <option value="Vivekanand Institute Of Professional Studies">
                Vivekanand Institute Of Professional Studies
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
