import React from "react";
import styles from "./AssignmentCard.module.css";
import Image from "next/image";
import { assignmentDetailsActions } from "../store/index";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

function AssignmentCard(props) {
  const router = useRouter();
  const dispatch = useDispatch();
  function detailsHandler() {
    dispatch(assignmentDetailsActions.setDisplayDetails(true));

    dispatch(assignmentDetailsActions.setId(props.id));
  }
  return (
    <div className={styles.assignment_body}>
      <span className={styles.container}>
        <span className={styles.subject_div}>
          {router.pathname === "/dashboard/reports" ? (
            <h4>{props.name}</h4>
          ) : (
            <h4>{props.subject} Assignment</h4>
          )}
        </span>
        <span className={styles.date_div}>
          <span className={styles.date_icon_div}>
            <Image
              width="22px"
              height="25px"
              src="/dashboard-display-date.svg"
              alt="dashboard-display-date"
            />
          </span>

          {router.pathname === "/dashboard/reports" ? (
            <h4>{props.submitDate}</h4>
          ) : (
            <h4>{props.duedate}</h4>
          )}
        </span>
      </span>

      <span className={styles.button_div}>
        <button onClick={detailsHandler}>
          <Image
            width="22px"
            height="25px"
            src="/dashboard-display-button.svg"
            alt="dashboard-display-button"
          />
          <span className={styles.tooltip_text}>Details</span>
        </button>
      </span>
    </div>
  );
}

export default AssignmentCard;
