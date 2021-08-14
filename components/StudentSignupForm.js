import React from "react";
import styles from "../components/StudentSignupForm.module.css";
import Input from "../components/Input";
import Link from "next/link";
import LoadingForm from "../components/LoadingForm";
import Label from "../components/Label";
import FormButton from "../components/FormButton";
import { useState, useRef } from "react";

function StudentSignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [studentID, setStudentID] = useState("");
  const [gender, setGender] = useState("");
  const [loading, setLoading] = useState(false);

  const [reset, setReset] = useState(false);
  const [successToggle, setSuccessToggle] = useState(false);
  const [errorResponse, setErrorResponse] = useState(false);
  const [errorResponseMessage, setErrorResponseMessage] = useState("");

  const courseRef = useRef();
  const yearRef = useRef();
  const semesterRef = useRef();
  const organizationRef = useRef();

  function nameHandler(data) {
    setName(data);
  }
  function emailHandler(data) {
    setEmail(data);
  }
  function studentIDHandler(data) {
    setStudentID(data);
  }
  function genderHandler(event) {
    setGender(event.target.value);
  }

  async function studentSignupFormHandler(event) {
    event.preventDefault();
    let course;
    let year;
    let semester;
    let organization;

    course = courseRef.current.value;
    year = yearRef.current.value;
    semester = semesterRef.current.value;
    organization = organizationRef.current.value;

    setLoading(true);
    const response = await fetch("/api/studentSignup", {
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
    <div className={styles.studentSignup_form}>
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
          id="studentSignupForm"
          onSubmit={studentSignupFormHandler}
          className={styles.form}
          autoComplete="off"
        >
          <div className={styles.form_elements}>
            <Label for="studentid" text="Student ID"></Label>
            <Input
              id="studentid"
              name="studentid"
              type="text"
              required="true"
              height="40px"
              value={studentIDHandler}
              reset={reset}
            />
          </div>
          <div className={styles.form_elements}>
            <Label for="name" text="Name"></Label>
            <Input
              id="name"
              name="name"
              type="text"
              required="true"
              height="40px"
              value={nameHandler}
              reset={reset}
            />
          </div>
          <div className={styles.form_elements}>
            <Label for="email" text="Email"></Label>
            <Input
              id="email"
              name="email"
              type="email"
              required="true"
              height="40px"
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
          <div
            className={`${styles.form_elements} ${styles.form_element_course}`}
          >
            <div>
              <Label for="course" text="Course"></Label>
              <select
                name="course"
                id="course"
                ref={courseRef}
                defaultValue=""
                required
              >
                <option value="" disabled>
                  Select
                </option>
                <option value="BCA">BCA</option>
                <option value="BBA">BBA</option>
                <option value="BCOM">BCOM</option>
                <option value="BA">BA</option>
              </select>
            </div>
            <div>
              <Label for="year" text="Year"></Label>
              <select
                name="year"
                id="year"
                ref={yearRef}
                defaultValue=""
                required
              >
                <option value="" disabled>
                  Select
                </option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </div>
            <div>
              <Label for="semester" text="Semester"></Label>
              <select
                name="semester"
                id="semester"
                ref={semesterRef}
                defaultValue=""
                required
              >
                <option value="" disabled>
                  Select
                </option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
              </select>
            </div>
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

export default StudentSignupForm;
