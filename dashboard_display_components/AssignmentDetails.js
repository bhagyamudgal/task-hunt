import React, { useState, useRef } from "react";
import styles from "./AssignmentDetails.module.css";
import Image from "next/image";
import { assignmentDetailsActions } from "../store/index";
import LoadingForm from "../components/LoadingForm";
import { useDispatch } from "react-redux";
import firebase from "firebase/app";
import "firebase/storage";
import { nanoid } from "nanoid";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";

function AssignmentDetails(props) {
  const router = useRouter();
  const fileRef = useRef();
  const dispatch = useDispatch();
  const [session, loadingSession] = useSession();
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);
  const [error, seterror] = useState("");
  const [successToggle, setSuccessToggle] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  let orignalFilename;

  async function uploadFile() {
    // get file
    var file = fileRef.current.files[0];
    orignalFilename = file.name;
    var filename = nanoid();
    // create a storage ref
    var storageRef = firebase.storage().ref("assignments/student/" + filename);
    // upload file
    var task = await storageRef.put(file);

    const downloadURL = await task.ref.getDownloadURL();

    return downloadURL;
  }

  function detailsHandler() {
    dispatch(assignmentDetailsActions.setDisplayDetails(false));
  }
  function detailsHandler2() {
    router.push("/dashboard/assignments");
  }

  let subject;
  let title;
  let duedate;
  let description;
  let fileURL;
  let fileName;
  props.assignments.forEach((assignment) => {
    if (assignment._id === props.id) {
      subject = assignment.subject;
      title = assignment.title;
      duedate = assignment.duedate;
      description = assignment.description;
      fileURL = assignment.fileURL;
      fileName = assignment.orignalFilename;
    }
  });

  let course = session.user.course;
  let semester = session.user.semester;
  let year = session.user.year;
  let name = session.user.name;
  let submitDate = new Date();
  let assignmentId = props.id;

  async function submitHandler() {
    if (
      fileRef.current.files[0] === null ||
      fileRef.current.files[0] === undefined
    ) {
      seterror("Please choose file to add!");
    } else {
      seterror("");
      let username;
      if (session) {
        username = session.user.username;
      }
      let fileURL = await uploadFile();
      setLoading(true);
      if (fileURL !== undefined || fileURL !== null) {
        const response = await fetch("/api/auth/submitAssignment", {
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
            name,
            submitDate,
            assignmentId,
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
          setLoading(false);
          setSuccessMessage(data.message);
          setSuccessToggle(true);
        }
      }
    }
  }

  async function deleteHandler() {
    setLoading(true);

    const response = await fetch("/api/auth/deleteAssignment", {
      method: "PATCH",
      body: JSON.stringify({
        assignmentId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      setLoading(false);
      setSuccessMessage("Internal Server Error!");
      setReload(true);
      setSuccessToggle(true);
    } else {
      setLoading(false);
      setSuccessMessage(data.message);
      setReload(true);
      setSuccessToggle(true);
    }
  }

  // console.log("HH" + assignment);
  // console.log("HH" + JSON.parse(assignment.slice(0, -1)));

  return (
    <>
      <div
        className={`${styles.assignment_body_div} ${loading && styles.center}`}
      >
        {loading ? (
          <LoadingForm />
        ) : successToggle ? (
          <div className={styles.success_div}>
            <h4>{successMessage}</h4>
            <span className={styles.backbtn}>
              {reload ? (
                <button type="button" onClick={detailsHandler2}>
                  Back
                </button>
              ) : (
                <button type="button" onClick={detailsHandler}>
                  Back
                </button>
              )}
            </span>
          </div>
        ) : (
          <>
            <div className={styles.section1}>
              <span className={styles.heading}>
                <h3>{subject} Assignment</h3>
              </span>
              <span className={styles.date}>{duedate}</span>
            </div>
            <div className={styles.section2}>
              <div className={styles.title}>
                <h4>{title}</h4>
              </div>
              <div className={styles.description}>{description}</div>
            </div>
            <div className={styles.section3}>
              {session.user.usertype === "student" && (
                <span className={styles.add_files_div}>
                  <label>Attach Your Work Here: </label>
                  <input
                    id="attachment"
                    name="attachment"
                    type="file"
                    height="40px"
                    ref={fileRef}
                    className={styles.input_file}
                    required
                  />
                  {error}
                </span>
              )}
              <span className={styles.attached_files_div}>
                <Image
                  width="30px"
                  height="30px"
                  src="/attachment-icon.png"
                  alt="attachment-icon"
                />
                <a href={fileURL} target="_blank" rel="noreferrer">
                  {fileName}
                </a>
              </span>
            </div>
            <div className={styles.section4}>
              <span className={styles.submit_div}>
                {session.user.usertype === "teacher" ? (
                  <button type="button" onClick={deleteHandler}>
                    Delete
                  </button>
                ) : (
                  <button type="button" onClick={submitHandler}>
                    Submit
                  </button>
                )}
              </span>
              <span className={styles.back_div}>
                <button type="button" onClick={detailsHandler}>
                  Back
                </button>
              </span>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default AssignmentDetails;
