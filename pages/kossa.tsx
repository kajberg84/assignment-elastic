import { GetServerSidePropsContext } from "next"
import React from "react"

export default function kossa({ user }: { user: string }) {
  return <div>{user}</div>
}

//get serversideprops
export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    redirect: {
      destination: "/",
      permanent: false,
    },
  }
}
