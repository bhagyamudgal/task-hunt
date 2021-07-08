import React from "react";
import { getSession } from "next-auth/client";
import LayoutDashboard from "../../layout/LayoutDashboard";

function index() {
  return (
    <>
      <LayoutDashboard />
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

  return {
    props: { session },
  };
};
export default index;
