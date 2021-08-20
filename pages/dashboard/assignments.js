import React from "react";
import { connectToDatabase } from "../../lib/db";
import { getSession } from "next-auth/client";
import { Provider } from "react-redux";
import LayoutDashboard from "../../layout/LayoutDashboard";
import DashboardDisplay from "../../components/DashboardDisplay";
import AssignmentsBody from "../../dashboard_display_components/AssignmentsBody";
import store from "../../store/index";
import Head from "next/head";

function DashboardAssignmentsPage(props) {
  return (
    <Provider store={store}>
      <Head>
        <title>Assignments | Task Hunt</title>

        <meta name="title" content="Assignments | Task Hunt" />

        <meta name="robots" content="noindex, nofollow" />
        <meta content="text/html; charset=utf-8" />
        <meta name="language" content="English" />

        <meta name="author" content="Task Hunt - Bhagya Mudgal" />
      </Head>
      <LayoutDashboard usertype={props.session.user.usertype}>
        <DashboardDisplay>
          <AssignmentsBody assignments={JSON.parse(props.assignments)} />
        </DashboardDisplay>
      </LayoutDashboard>
    </Provider>
  );
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps = async (ctx) => {
  const session = await getSession({ req: ctx.req });

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  if (session.user.newuser === true) {
    return {
      redirect: {
        destination: "/dashboard/new-user",
        permanent: false,
      },
    };
  }
  const client = await connectToDatabase();
  const db = client.db("assignments");
  let assignments;
  if (session.user.usertype === "student") {
    assignments = await db
      .collection("teacher")
      .find({
        course: session.user.course,
        year: session.user.year,
        semester: session.user.semester,
      })
      .toArray();
  } else {
    assignments = await db
      .collection("teacher")
      .find({
        subject: session.user.subject,
        username: session.user.username,
      })
      .toArray();
  }

  // console.log(assignments);
  let obj = JSON.stringify(assignments);
  return {
    props: { session, assignments: obj },
  };
};
export default DashboardAssignmentsPage;
