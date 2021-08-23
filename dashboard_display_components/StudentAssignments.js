import React, { useState, useEffect } from "react";
import styles from "./StudentAssignments.module.css";
import AssignmentCard from "./AssignmentCard";
import { useRouter } from "next/router";

function StudentAssignments(props) {
  const router = useRouter();
  const [empty, setEmpty] = useState(false);
  useEffect(() => {
    if (router.pathname === "/dashboard/reports") {
      if (props.studentAssignments.length === 0) {
        setEmpty(true);
      } else {
        setEmpty(false);
      }
    } else {
      if (props.assignments.length === 0) {
        setEmpty(true);
      } else {
        setEmpty(false);
      }
    }
  }, [props.assignments, props.studentAssignments, router.pathname]);

  // console.log(props.assignments);

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
        {empty && (
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
