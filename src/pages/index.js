import Layout from "../components/layout";

import {getSession} from "next-auth/react";
import QuickAccess from "./quickaccess";

export default function Home({session, quickaccess}) {

  return (
    <Layout title="Bienvenido">
      <h1>Bienvenido, <strong>{session ? (session.user.name):(<p>Skeleton</p>)}</strong></h1>
      <QuickAccess quickAccessData={quickaccess}/>
    </Layout>
  );
}

export const getServerSideProps = async (context) => {

  const session = await getSession(context)
  if (!session) return {
      redirect: {
          destination: '/login',
          permanent: false
      }
  }

  const res = await fetch("http://localhost:3000/api/quickaccess")
  const quickaccess = await res.json();

  return {
      props: {
          session,
          quickaccess
      }
  }
}