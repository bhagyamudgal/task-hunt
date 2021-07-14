import React from "react";
import { getSession } from "next-auth/client";
import { Provider } from "react-redux";
import LayoutDashboard from "../../layout/LayoutDashboard";
import DashboardDisplay from "../../components/DashboardDisplay";
import AssignmentsBody from "../../dashboard_display_components/AssignmentsBody";
import store from "../../store/index";

function DashboardAssignmentsPage() {
  return (
    <Provider store={store}>
      <LayoutDashboard>
        <DashboardDisplay>
          <AssignmentsBody />
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

  return {
    props: { session },
  };
};
export default DashboardAssignmentsPage;
