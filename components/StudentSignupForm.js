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
  const [errorMessage, seterrorMessage] = useState("");
  const [errorToggle, seterrorToggle] = useState(false);
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
    if (courseRef.current.value === "SELECT") {
      seterrorMessage("Please Select Course");
      seterrorToggle(true);
    } else {
      seterrorToggle(false);
      course = courseRef.current.value;
      if (yearRef.current.value === "SELECT") {
        seterrorMessage("Please Select Year");
        seterrorToggle(true);
      } else {
        seterrorToggle(false);
        year = yearRef.current.value;
        if (semesterRef.current.value === "SELECT") {
          seterrorMessage("Please Select Semester");
          seterrorToggle(true);
        } else {
          seterrorToggle(false);
          semester = semesterRef.current.value;
          if (organizationRef.current.value === "SELECT") {
            seterrorMessage("Please Select Organization");
            seterrorToggle(true);
          } else {
            seterrorToggle(false);
            organization = organizationRef.current.value;
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
        }
      }
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
          {errorToggle && (
            <div className={styles.error_div}>
              <h4>*{errorMessage}</h4>
            </div>
          )}
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
              <select name="course" id="course" ref={courseRef} required>
                <option value="SELECT">SELECT</option>
                <option value="BCA">BCA</option>
                <option value="BBA">BBA</option>
                <option value="BCOM">BCOM</option>
                <option value="BA">BA</option>
              </select>
            </div>
            <div>
              <Label for="year" text="Year"></Label>
              <select name="year" id="year" ref={yearRef} required>
                <option value="SELECT">SELECT</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </div>
            <div>
              <Label for="semester" text="Semester"></Label>
              <select name="semester" id="semester" ref={semesterRef} required>
                <option value="SELECT">SELECT</option>
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

export default StudentSignupForm;
