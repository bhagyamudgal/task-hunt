import React, { useState } from "react";
import styles from "./StudentAssignments.module.css";
import AssignmentCard from "./AssignmentCard";
import { useRouter } from "next/router";

function StudentAssignments(props) {
  const router = useRouter();
  return (
    <>
      <div className={styles.heading_div}>
        {router.pathname === "/dashboard/reports" ? (
          <h2>Students Report</h2>
        ) : (
          <h2>Assignments</h2>
        )}
      </div>
      <div className={styles.assignment_div}>
        {router.pathname === "/dashboard/reports"
          ? props.studentAssignments === undefined && (
              <div className={styles.empty}>
                <h3>No Assignments to Show.</h3>
              </div>
            )
          : props.assignment === undefined && (
              <div className={styles.empty}>
                <h3>No Assignments to Show.</h3>
              </div>
            )}

        {router.pathname === "/dashboard/reports"
          ? props.studentAssignments.map((studentAssignment) => {
              return (
                <AssignmentCard
                  key={studentAssignment._id}
                  id={studentAssignment._id}
                  name={studentAssignment.studentName}
                  submitDate={studentAssignment.submitDate.substring(0, 10)}
                />
              );
            })
          : props.assignments.map((assignment) => {
              return (
                <AssignmentCard
                  key={assignment._id}
                  id={assignment._id}
                  subject={assignment.subject}
                  duedate={assignment.duedate}
                />
              );
            })}
      </div>
    </>
  );
}

export default StudentAssignments;
