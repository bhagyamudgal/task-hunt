import React, { useEffect } from "react";
import DisplayButton from "./DisplayButton";
import CreateAssignment from "./CreateAssignment";
import styles from "./DashboardBody.module.css";
import { createAssignmentActions } from "../store/index";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";

function DashboardBody(props) {
  const router = useRouter();
  const dispatch = useDispatch();

  const createAssignment = useSelector(
    (state) => state.createAssignment.displayCreateAssignment
  );

  useEffect(() => {
    router.events.on("routeChangeStart", (url) => {
      dispatch(createAssignmentActions.setDisplayCreateAssignment(false));
    });
  });
  function showAssignmentsHandler() {
    router.push("/dashboard/assignments");
  }
  function showReportsHandler() {
    router.push("/dashboard/reports");
  }
  function createAssignmentHandler() {
    dispatch(createAssignmentActions.setDisplayCreateAssignment(true));
  }

  return (
    <>
      {createAssignment ? (
        <CreateAssignment />
      ) : (
        <div className={styles.buttons_div}>
          <DisplayButton
            text="View Assignments"
            onClick={showAssignmentsHandler}
          />
          {props.usertype === "teacher" && (
            <DisplayButton
              text="Create New Assignment"
              onClick={createAssignmentHandler}
            />
          )}
          <DisplayButton text="Completed Assignments" />
          {props.usertype === "teacher" && (
            <DisplayButton text="View Reports" onClick={showReportsHandler} />
          )}
        </div>
      )}
    </>
  );
}

export default DashboardBody;
