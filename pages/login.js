import React from "react";
import LoginForm from "../components/LoginForm";
import styles from "../styles/login.module.css";
import Head from "next/head";
import { getSession } from "next-auth/client";

function LoginPage() {
  return (
    <>
      <Head>
        <title>Login | Task Hunt</title>

        <meta name="title" content="Login | Task Hunt" />
        <meta name="description" content="Task Hunt, Login page" />
        <meta
          name="keywords"
          content="login, task hunt login , task, hunt, taskhunt, ats, assignment tracking sytem, task hunt, assignments, students, teachers
          "
        />
        <meta name="robots" content="index, follow" />
        <meta content="text/html; charset=utf-8" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="10 days" />
        <meta name="author" content="Task Hunt - Bhagya Mudgal" />
      </Head>
      <div className={styles.body_login}>
        <div className={styles.main_div}>
          <div className={styles.heading_div}>
            <h1>Login</h1>
          </div>
        </div>

        <LoginForm />
      </div>
    </>
  );
}
export const getServerSideProps = async (ctx) => {
  const session = await getSession({ req: ctx.req });

  if (session) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
};
export default LoginPage;
