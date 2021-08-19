import React from "react";
import { getSession } from "next-auth/client";
import LayoutDashboard from "../../layout/LayoutDashboard";
import DashboardDisplay from "../../components/DashboardDisplay";
import NewPassword from "../../dashboard_display_components/NewPassword";
import Head from "next/head";

function DashboardHomePage(props) {
  return (
    <>
      <Head>
        <title>New User | Task Hunt</title>

        <meta name="title" content="New User | Task Hunt" />

        <meta name="robots" content="noindex, nofollow" />
        <meta content="text/html; charset=utf-8" />
        <meta name="language" content="English" />

        <meta name="author" content="Task Hunt - Bhagya Mudgal" />
      </Head>
      <div>
        <LayoutDashboard usertype={props.session.user.usertype}>
          <div className="center">
            <DashboardDisplay>
              <NewPassword />
            </DashboardDisplay>
          </div>
        </LayoutDashboard>
      </div>
      <style jsx>{`
        .center {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100vw;
        }
      `}</style>
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

  if (session.user.newuser === false) {
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
export default DashboardHomePage;
