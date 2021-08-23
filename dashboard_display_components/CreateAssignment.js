import React from "react";
import styles from "./CreateAssignment.module.css";
import { getSession } from "next-auth/client";
import LoadingForm from "../components/LoadingForm";
import { useState, useRef } from "react";
import { createAssignmentActions } from "../store/index";
import { useDispatch } from "react-redux";
import firebase from "firebase/app";
import "firebase/storage";
import { nanoid } from "nanoid";

function CreateAssignment(props) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const [successToggle, setSuccessToggle] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  const titleRef = useRef();
  const duedateRef = useRef();
  const descriptionRef = useRef();
  const fileRef = useRef();
  const courseRef = useRef();
  const yearRef = useRef();
  const semesterRef = useRef();
  const subjectRef = useRef();
  let orignalFilename;
  function backHandler() {
    setSuccessToggle(false);
  }
  function backToHomeHandler() {
    dispatch(createAssignmentActions.setDisplayCreateAssignment(false));
  }
  async function uploadFile() {
    // get file
    var file = fileRef.current.files[0];
    orignalFilename = file.name;
    var filename = nanoid();
    // create a storage ref
    var storageRef = firebase.storage().ref("assignments/teacher/" + filename);
    // upload file
    var task = await storageRef.put(file);

    const downloadURL = await task.ref.getDownloadURL();

    return downloadURL;
  }

  async function createAssignmentFormHandler(event) {
    event.preventDefault();
    let username;
    const session = await getSession();
    if (session) {
      username = session.user.username;
    }
    let course = courseRef.current.value;
    let year = yearRef.current.value;
    let semester = semesterRef.current.value;
    let subject = subjectRef.current.value;
    let title = titleRef.current.value;
    let duedate = duedateRef.current.value;
    let description = descriptionRef.current.value;

    let fileURL = await uploadFile();
    setLoading(true);
    if (fileURL !== undefined || fileURL !== null) {
      const response = await fetch("/api/auth/createAssignment", {
        method: "POST",
        body: JSON.stringify({
          title,
          duedate,
          description,
          subject,
          course,
          year,
          semester,
          fileURL,
          orignalFilename,
          username,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        setLoading(false);
        setSuccessMessage(data.message);
        setSuccessToggle(true);
      } else {
        event.target.reset();
        setLoading(false);
        setSuccessMessage(data.message);
        setSuccessToggle(true);
      }
    }
  }

  return (
    <div className={styles.createAssignment_form}>
      {loading ? (
        <LoadingForm />
      ) : successToggle ? (
        <div className={styles.success_div}>
          <h4>{successMessage}</h4>
          <span className={styles.back_div}>
            <button type="button" onClick={backHandler}>
              Back
            </button>
          </span>
        </div>
      ) : (
        <form
          id="createAssignmentForm"
          onSubmit={createAssignmentFormHandler}
          className={styles.form}
          autoComplete="off"
        >
          <div className={styles.form_elements}>
            <label className={styles.label} htmlFor="course">
              Course
            </label>
            <select
              name="course"
              id="course"
              ref={courseRef}
              required
              defaultValue=""
            >
              <option value="" disabled>
                Please Choose One Option
              </option>
              <option value="BCA">BCA</option>
              <option value="BBA">BBA</option>
              <option value="BCOM">BCOM</option>
              <option value="BA">BA</option>
            </select>
          </div>
          <div className={styles.form_elements}>
            <label className={styles.label} htmlFor="year">
              Year
            </label>
            <select
              name="year"
              id="year"
              ref={yearRef}
              required
              defaultValue=""
            >
              <option value="" disabled>
                Please Choose One Option
              </option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </div>
          <div className={styles.form_elements}>
            <label className={styles.label} htmlFor="semester">
              Semester
            </label>
            <select
              name="semester"
              id="semester"
              ref={semesterRef}
              required
              defaultValue=""
            >
              <option value="" disabled>
                Please Choose One Option
              </option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
            </select>
          </div>

          <div className={styles.form_elements}>
            <label className={styles.label} htmlFor="subject">
              Subject
            </label>
            <select
              name="subject"
              id="subject"
              className={styles.select}
              ref={subjectRef}
              required
              defaultValue=""
            >
              <option value="" disabled>
                Please Choose One Option
              </option>
              <option value={props.subject}>{props.subject}</option>
              {/* <option value="Computer Networks">Computer Networks</option>
              <option value="Data Structures and Algorithms">
                Data Structures and Algorithms
              </option>
              <option value="Foundation of Information Technology">
                Foundation of Information Technology
              </option>
              <option value="OOPS with C++">OOPS with C++</option>
              <option value="Java">Java</option> */}
            </select>
          </div>
          <div className={styles.form_elements}>
            <label className={styles.label} htmlFor="title">
              Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              placeholder="Add Title"
              height="40px"
              ref={titleRef}
              className={styles.input}
              required
            />
          </div>
          <div className={styles.form_elements}>
            <label className={styles.label} htmlFor="duedate">
              Due Date
            </label>
            <input
              id="duedate"
              name="duedate"
              type="date"
              height="40px"
              ref={duedateRef}
              className={styles.input}
              required
            />
          </div>
          <div className={styles.form_elements}>
            <label className={styles.label} htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows="5"
              placeholder="Add Description"
              ref={descriptionRef}
              cols="40"
            ></textarea>
          </div>
          <div className={styles.form_elements}>
            <label className={styles.label} htmlFor="attachment">
              Attach File
            </label>
            <input
              id="attachment"
              name="attachment"
              type="file"
              height="40px"
              ref={fileRef}
              className={styles.input_file}
              required
            />
          </div>
          <div
            className={`${styles.form_elements} ${styles.form_elements_button}`}
          >
            <button className={styles.button} type="submit">
              Submit
            </button>
            <button
              className={styles.button}
              type="button"
              onClick={backToHomeHandler}
            >
              Back
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
export default CreateAssignment;
