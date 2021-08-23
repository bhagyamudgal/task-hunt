import React, { useEffect } from "react";
import StudentAssignments from "./StudentAssignments";
import AssignmentDetails from "./AssignmentDetails";
import { assignmentDetailsActions } from "../store/index";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";

function AssignmentsBody(props) {
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
      {/* {console.log(props.assignments)} */}
      {displayDetails ? (
        <AssignmentDetails id={assignmentId} assignments={props.assignments} />
      ) : (
        <StudentAssignments assignments={props.assignments} />
      )}
    </>
  );
}

export default AssignmentsBody;
