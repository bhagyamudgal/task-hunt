import React, { useEffect } from "react";
import StudentAssignments from "./StudentAssignments";
import StudentAssignmentDetails from "./StudentAssignmentDetails";
import { assignmentDetailsActions } from "../store/index";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";

function StudentAssignmentsBody(props) {
  const displayDetails = useSelector(
    (state) => state.assignmentDetails.displayDetails
  );
  const assignmentId = useSelector((state) => state.assignmentDetails.id);
  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    router.events.on("routeChangeStart", (url) => {
      dispatch(assignmentDetailsActions.setDisplayDetails(false));
    });
  });

  return (
    <>
      {console.log(props.studentAssignments)}
      {displayDetails ? (
        <StudentAssignmentDetails
          id={assignmentId}
          studentAssignments={props.studentAssignments}
        />
      ) : (
        <StudentAssignments studentAssignments={props.studentAssignments} />
      )}
    </>
  );
}

export default StudentAssignmentsBody;
