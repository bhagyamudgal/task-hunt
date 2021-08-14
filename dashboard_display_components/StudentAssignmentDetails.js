import React, { useEffect, useState, useRef } from "react";
import styles from "./StudentAssignmentDetails.module.css";
import Image from "next/image";
import { assignmentDetailsActions } from "../store/index";
import LoadingForm from "../components/LoadingForm";
import { useDispatch } from "react-redux";
import firebase from "firebase/app";
import "firebase/storage";
import { nanoid } from "nanoid";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";

function StudentAssignmentDetails(props) {
  const router = useRouter();

  const dispatch = useDispatch();

  function detailsHandler() {
    dispatch(assignmentDetailsActions.setDisplayDetails(false));
  }

  let studentName;
  let subject;
  let title;
  let submitDate;
  let description;
  let fileURL;
  let fileName;
  props.studentAssignments.forEach((studentAssignment) => {
    if (studentAssignment._id === props.id) {
      subject = studentAssignment.subject;
      title = studentAssignment.title;
      description = studentAssignment.description;
      fileURL = studentAssignment.fileURL;
      fileName = studentAssignment.orignalFilename;
      studentName = studentAssignment.studentName;
      submitDate = studentAssignment.submitDate.substring(0, 10);
    }
  });

  // console.log("HH" + assignment);
  // console.log("HH" + JSON.parse(assignment.slice(0, -1)));

  return (
    <div className={`${styles.assignment_body_div}`}>
      <div className={styles.section1}>
        <span className={styles.heading}>
          <h3>{studentName}&apos;s Assignment</h3>
        </span>
        <span className={styles.date}>{submitDate}</span>
      </div>
      <div className={styles.section2}>
        <div className={styles.title}>
          <h4>
            {subject} - {title}
          </h4>
        </div>
        <div className={styles.description}>{description}</div>
      </div>
      <div className={styles.section3}>
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
        <span className={styles.back_div}>
          <button type="button" onClick={detailsHandler}>
            Back
          </button>
        </span>
      </div>
    </div>
  );
}

export default StudentAssignmentDetails;
