import React from "react";
import styles from "../styles/features.module.css";
import Head from "next/head";

function FeaturesPage() {
  return (
    <>
      <Head>
        <title>Features | Task Hunt</title>

        <meta name="title" content="Features | Task Hunt" />
        <meta
          name="description"
          content="Task Hunt, Get to know about features of task hunt."
        />
        <meta
          name="keywords"
          content="features, task hunt features , task, hunt, taskhunt, ats, assignment tracking sytem, task hunt, assignments, students, teachers"
        />
        <meta name="robots" content="index, follow" />
        <meta content="text/html; charset=utf-8" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="10 days" />
        <meta name="author" content="Task Hunt - Bhagya Mudgal" />
      </Head>
      <div className={styles.body_features}>
        <div className={styles.heading_div}>
          <h1>Features</h1>
        </div>
        <div className={styles.points_div}>
          <ul>
            <li>
              All in one platform for teachers and students to work on
              assignments.
            </li>
            <li>Share assignments hassle free within few minutes.</li>
            <li>Interactive User Interface.</li>
            <li>Generate report for student submissions.</li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default FeaturesPage;
