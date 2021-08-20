import React from "react";
import { connectToDatabase } from "../../lib/db";
import { getSession } from "next-auth/client";
import LayoutDashboard from "../../layout/LayoutDashboard";
import DashboardDisplay from "../../components/DashboardDisplay";
import StudentAssignmentsBody from "../../dashboard_display_components/StudentAssignmentsBody";
import store from "../../store/index";
import { Provider } from "react-redux";
import Head from "next/head";

function DashboardReportsPage(props) {
  return (
    <Provider store={store}>
      <Head>
        <title>Reports | Task Hunt</title>

        <meta name="title" content="Reports | Task Hunt" />

        <meta name="robots" content="noindex, nofollow" />
        <meta content="text/html; charset=utf-8" />
        <meta name="language" content="English" />

        <meta name="author" content="Task Hunt - Bhagya Mudgal" />
      </Head>
      <LayoutDashboard usertype={props.session.user.usertype}>
        <DashboardDisplay>
          <StudentAssignmentsBody
            studentAssignments={JSON.parse(props.studentAssignments)}
          />
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
  if (session.user.usertype !== "teacher") {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }
  const client = await connectToDatabase();
  const db = client.db("assignments");

  let studentAssignments = await db
    .collection("student")
    .find({
      subject: session.user.subject,
    })
    .toArray();

  // console.log(studentAssignments);
  let obj = JSON.stringify(studentAssignments);

  return {
    props: { session, studentAssignments: obj },
  };
};
export default DashboardReportsPage;
