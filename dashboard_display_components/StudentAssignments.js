import React from "react";
import styles from "./StudentAssignments.module.css";
import AssignmentCard from "./AssignmentCard";

function StudentAssignments(props) {
  return (
    <>
      <div className={styles.heading_div}>
        <h2>Assignments</h2>
      </div>
      <div className={styles.assignment_div}>
        {props.assignments.map((assignment) => {
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
