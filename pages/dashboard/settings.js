import React from "react";
import { getSession } from "next-auth/client";
import { Provider } from "react-redux";
import LayoutDashboard from "../../layout/LayoutDashboard";
import DashboardDisplay from "../../components/DashboardDisplay";
import SettingsBody from "../../dashboard_display_components/SettingsBody";
import store from "../../store/index";
import Head from "next/head";

function SettingsPage(props) {
  return (
    <Provider store={store}>
      <LayoutDashboard usertype={props.session.user.usertype}>
        <Head>
          <title>Settings | Task Hunt</title>

          <meta name="title" content="Settings | Task Hunt" />

          <meta name="robots" content="noindex, nofollow" />
          <meta content="text/html; charset=utf-8" />
          <meta name="language" content="English" />

          <meta name="author" content="Task Hunt - Bhagya Mudgal" />
        </Head>
        <DashboardDisplay>
          <SettingsBody />
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

  return {
    props: { session },
  };
};
export default SettingsPage;
