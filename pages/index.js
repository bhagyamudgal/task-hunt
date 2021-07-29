import Button from "../components/Button";
import styles from "../styles/home.module.css";
import Head from "next/head";


function HomePage(props) {
  return (
    <>
      <Head>
        <title>Home | Task Hunt</title>
        <meta name="title" content="Home | Task Hunt" />
        <meta
          name="description"
          content="Task Hunt, all in one solution for tracking assignments. Easy to use and handle by teachers and students."
        />
        <meta
          name="keywords"
          content="task, hunt, taskhunt, ats, assignment tracking sytem, task hunt, assignments, students, teachers"
        />
        <meta name="robots" content="index, follow" />
        <meta content="text/html; charset=utf-8" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="10 days" />
        <meta name="author" content="Task Hunt - Bhagya Mudgal" />
      </Head>
      <div className={styles.heading_div}>
        <h1>A well designed solution for tracking Assignments.</h1>
      </div>

      <div className={styles.button_div}>
        <Button
          target="/signup"
          width="240px"
          text="Register Now"
          boxshadow="true"
          boxtype="true"
        >
          Signup
        </Button>
        <Button
          target="/login"
          text="Login"
          width="200px"
          boxshadow="true"
          boxtype="true"
        >
          Login
        </Button>
      </div>
    </>
  );
}

export default HomePage;
