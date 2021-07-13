import React from "react";
import styles from "./AssignmentDetails.module.css";
import Image from "next/image";
import { assignmentDetailsActions } from "../store/index";
import { useDispatch } from "react-redux";

function AssignmentDetails() {
  const dispatch = useDispatch();
  function detailsHandler() {
    dispatch(assignmentDetailsActions.setDisplayDetails(false));
  }
  return (
    <>
      <div className={styles.assignment_body_div}>
        <div className={styles.section1}>
          <span className={styles.heading}>
            <h3>Maths Assignment</h3>
          </span>
          <span className={styles.date}>19-2-2019</span>
        </div>
        <div className={styles.section2}>
          <div className={styles.description}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum
            consequuntur nostrum fuga eum eos maiores ipsam incidunt magnam
            culpa! Nulla distinctio cumque laudantium magni recusandae!
          </div>
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
