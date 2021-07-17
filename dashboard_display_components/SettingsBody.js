import React, { useEffect } from "react";
import DisplayButton from "./DisplayButton";
import ChangePassword from "./ChangePassword";
import { changePasswordDetailsActions } from "../store/index";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
function SettingsBody() {
  const displayChangePasswordDetails = useSelector(
    (state) => state.changePasswordDetails.displayChangePasswordDetails
  );
  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    router.events.on("routeChangeStart", (url) => {
      dispatch(
        changePasswordDetailsActions.setDisplayChangePasswordDetails(false)
      );
    });
  });
  function detailsHandler() {
    dispatch(changePasswordDetailsActions.setDisplayChangePasswordDetails(true));
  }

  return (
    <>
      {displayChangePasswordDetails ? (
        <ChangePassword />
      ) : (
        <DisplayButton text="Change Password" onClick={detailsHandler}/>
      )}
    </>
  );
}

export default SettingsBody;
