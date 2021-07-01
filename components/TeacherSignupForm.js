import React from "react";
import styles from "../components/TeacherSignupForm.module.css";
import Input from "../components/Input";
import Label from "../components/Label";
import FormButton from "../components/FormButton";
import { useState, useRef } from "react";

function TeacherSignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [reset, setReset] = useState(false);

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

  function teacherSignupFormHandler(event) {
    event.preventDefault();
    console.log("Form Submitted Successfully");
    console.log(name);
    console.log(email);
    console.log(gender);
    console.log(subjectRef.current.value);
    console.log(postRef.current.value);
    console.log(organizationRef.current.value);
    event.target.reset();
    setReset(true);
    setTimeout(() => {
      setReset(false);
    }, 1000);
  }
  return (
    <div className={styles.teacherSignup_form}>
      <form
        id="teacherSignupForm"
        onSubmit={teacherSignupFormHandler}
        className={styles.form}
        autoComplete="off"
      >
        <div className={`${styles.form_elements} ${styles.form_element_width}`}>
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
        <div className={`${styles.form_elements} ${styles.form_element_width}`}>
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
        <div className={`${styles.form_elements} ${styles.form_element_radio}`}>
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
            <option value="SELECT" selected>
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
    </div>
  );
}

export default TeacherSignupForm;
