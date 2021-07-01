import Image from "next/image";
import styles from "../styles/signup.module.css";
import StudentSignupForm from "../components/StudentSignupForm";
import TeacherSignupForm from "../components/TeacherSignupForm";
import { useState } from "react";

function SignupPage() {
  const [student, setStudent] = useState(false);
  const [teacher, setTeacher] = useState(false);
  function studentSignupHandler(event) {
    setTeacher(false);
    setStudent(true);
  }

  function teacherSignupHandler(event) {
    setStudent(false);
    setTeacher(true);
  }

  return (
    <div className={styles.body_signup}>
      <div className={styles.main_div}>
        <div className={styles.heading_div}>
          <h1>Register As</h1>
        </div>
        <div className={styles.icon_group}>
          <div
            tabIndex="0"
            className={`${
              student
                ? styles.student_div_focus
                : styles.student_div
            }`}
            onClick={studentSignupHandler}
          >
            <Image
              src="/student-icon.png"
              alt="student-icon"
              height="102"
              width="135"
            />
            <h3>Student</h3>
          </div>
          <div className={`${
              teacher
                ? styles.teacher_div_focus
                : styles.teacher_div
            }`} onClick={teacherSignupHandler}>
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
      {student && <StudentSignupForm />}
      {teacher && <TeacherSignupForm />}
    </div>
  );
}

export default SignupPage;
