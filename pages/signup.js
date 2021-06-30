import React from "react";
import Image from "next/image";
import styles from "../styles/signup.module.css";
import StudentSignupForm from "../components/StudentSignupForm";
function signup() {
  function studentSignupHandler(params) {}

  function teacherSignupHandler(params) {}
  return (
    <div className={styles.body_signup}>
      <div className={styles.main_div}>
        <div className={styles.heading_div}>
          <h1>Register As</h1>
        </div>
        <div className={styles.icon_group}>
          <div className={styles.student_div} onClick={studentSignupHandler}>
            <Image
              src="/student-icon.png"
              alt="student-icon"
              height="102"
              width="135"
            />
            <h3>Student</h3>
          </div>
          <div className={styles.teacher_div} onClick={teacherSignupHandler}>
            <Image
              src="/teacher-icon.png"
              alt="teacher-icon"
              height="102"
              width="135"
            />
            <h3>Teacher</h3>
          </div>
        </div>
      </div>
      <StudentSignupForm />
    </div>
  );
}

export default signup;
