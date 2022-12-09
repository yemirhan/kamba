import type { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";

export const getAuth  = async (context: GetServerSidePropsContext, callback: () => any) => {
  const session = await getSession(context);
  console.log(session, "sesion");

  if (!session) {
    return {
      redirect: {
        destination: '/auth/signin',
        permanent: false,
      },
    };
  }
  if (session.user?.onboarded === false) {
    return {
      redirect: {
        destination: '/onboard',
        permanent: false,
      },
    };
  }
  return callback();
}