import React, { useEffect, useState } from "react";
import styles from "./AssignmentDetails.module.css";
import Image from "next/image";
import { assignmentDetailsActions } from "../store/index";
import { useDispatch } from "react-redux";

function AssignmentDetails(props) {
  const dispatch = useDispatch();

  function detailsHandler() {
    dispatch(assignmentDetailsActions.setDisplayDetails(false));
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

  // console.log("HH" + assignment);
  // console.log("HH" + JSON.parse(assignment.slice(0, -1)));

  return (
    <>
      <div className={styles.assignment_body_div}>
        <div className={styles.section1}>
          <span className={styles.heading}>
            <h3>{subject} Assignment</h3>
          </span>
          <span className={styles.date}>{duedate}</span>
        </div>
        <div className={styles.section2}>
          <div className={styles.description}>{description}</div>
        </div>
        <div className={styles.section3}>
          <span className={styles.add_files_div}>
            <button type="button">Choose Files To Add</button>
          </span>
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
            <button type="button">Submit</button>
          </span>
          <span className={styles.back_div}>
            <button type="button" onClick={detailsHandler}>
              Back
            </button>
          </span>
        </div>
      </div>
    </>
  );
}

export default AssignmentDetails;
