import React, { useEffect } from "react";
import StudentAssignments from "./StudentAssignments";
import AssignmentDetails from "./AssignmentDetails";
import { assignmentDetailsActions } from "../store/index";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";

function AssignmentsBody() {
  const displayDetails = useSelector(
    (state) => state.assignmentDetails.displayDetails
  );
  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    router.events.on("routeChangeStart", (url) => {
      dispatch(assignmentDetailsActions.setDisplayDetails(false));
    });
  });

  return <>{displayDetails ? <AssignmentDetails /> : <StudentAssignments />}</>;
}

export default AssignmentsBody;
