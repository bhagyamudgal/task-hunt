import React from "react";
import { getSession } from "next-auth/client";
import LayoutDashboard from "../../layout/LayoutDashboard";
import DashboardDisplay from "../../components/DashboardDisplay";
import DashboardProfile from "../../components/DashboardProfile";
import DashboardBody from "../../dashboard_display_components/DashboardBody";
import { Provider } from "react-redux";
import store from "../../store/index";

function DashboardHomePage(props) {
  return (
    <Provider store={store}>
      <LayoutDashboard usertype={props.session.user.usertype}>
        <DashboardDisplay>
          <DashboardBody usertype={props.session.user.usertype} />
        </DashboardDisplay>
        {props.session.user.usertype === "student" && (
          <DashboardProfile
            name={props.session.user.name}
            course={props.session.user.course}
            year={props.session.user.year}
            semester={props.session.user.semester}
            organization={props.session.user.organization}
            usertype={props.session.user.usertype}
          />
        )}
        {props.session.user.usertype === "teacher" && (
          <DashboardProfile
            name={props.session.user.name}
            post={props.session.user.post}
            subject={props.session.user.subject}
            organization={props.session.user.organization}
            usertype={props.session.user.usertype}
          />
        )}
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
export default DashboardHomePage;
