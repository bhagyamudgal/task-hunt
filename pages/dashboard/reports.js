import React from "react";
import { getSession } from "next-auth/client";
import LayoutDashboard from "../../layout/LayoutDashboard";
import DashboardDisplay from "../../components/DashboardDisplay";
import DashboardProfile from "../../components/DashboardProfile";
import DashboardBody from "../../dashboard_display_components/DashboardBody";

function DashboardReportsPage(props) {
  return (
    <>
      <LayoutDashboard usertype={props.session.user.usertype}>
        <DashboardDisplay>
        </DashboardDisplay>
      </LayoutDashboard>
    </>
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

  return {
    props: { session },
  };
};
export default DashboardReportsPage;
