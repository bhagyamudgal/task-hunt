import Image from "next/image";
import styles from "../styles/signup.module.css";
import StudentSignupForm from "../components/StudentSignupForm";
import TeacherSignupForm from "../components/TeacherSignupForm";
import { useState } from "react";
import Head from "next/head";

function SignupPage() {
  const [student, setStudent] = useState(false);
  const [teacher, setTeacher] = useState(false);
  const [textDisplay, setTextDisplay] = useState(true);
  function studentSignupHandler(event) {
    setTextDisplay(false);
    setTeacher(false);
    setStudent(true);
  }

  function teacherSignupHandler(event) {
    setTextDisplay(false);
    setStudent(false);
    setTeacher(true);
  }

  return (
    <>
      <Head>
        <title>Login | Task Hunt</title>

        <meta name="title" content="Signup | Task Hunt" />
        <meta
          name="description"
          content="Task Hunt, Signup page, get register today"
        />
        <meta
          name="keywords"
          content="signup, task hunt signup , task, hunt, taskhunt, ats, assignment tracking sytem, task hunt, assignments, students, teachers
          "
        />
        <meta name="robots" content="index, follow" />
        <meta content="text/html; charset=utf-8" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="10 days" />
        <meta name="author" content="Task Hunt - Bhagya Mudgal" />
      </Head>
      <div className={styles.body_signup}>
        <div className={styles.main_div}>
          <div className={styles.heading_div}>
            <h1>Register As</h1>
          </div>
          <div className={styles.icon_group}>
            <div
              tabIndex="0"
              className={`${
                student ? styles.student_div_focus : styles.student_div
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
            <div
              className={`${
                teacher ? styles.teacher_div_focus : styles.teacher_div
              }`}
              onClick={teacherSignupHandler}
            >
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
        {textDisplay && (
          <div className={styles.text}>
            <h3>Please Select From Above Given Options.</h3>
          </div>
        )}
        {student && <StudentSignupForm />}
        {teacher && <TeacherSignupForm />}
      </div>
    </>
  );
}

export default SignupPage;
