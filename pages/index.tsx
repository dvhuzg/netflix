import { NextPageContext } from "next";
import { signOut, getSession } from "next-auth/react";
import useCurrentUser from "../hooks/useCurrentUser";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}
export default function Home() {
  const { data: user } = useCurrentUser();
  return (
    <>
      <h1 className="text-4xl text-green-500">Netflix</h1>
      <p className="text-white">Loggin as:{user?.email}</p>
      <button className="h-10 w-full bg-white" onClick={() => signOut()}>
        Log out
      </button>
    </>
  );
}
