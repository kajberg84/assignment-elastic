import type { NextPage } from "next"
import Head from "next/head"
import Image from "next/image"
import { useAuth } from "../context/clientcontext"

const Home: NextPage = () => {
  const { user, login, logout } = useAuth()

  return (
    <div>
      <Head>
        <title>Elastic assignment</title>
      </Head>
      <h1>Elastic assignment</h1>
      <h2>User: {user ? "login" : "logout"}</h2>
      <div>
        <button onClick={login}>Login</button>
        <button onClick={() => logout("Kossan loggar ut")}>Logout</button>
      </div>
    </div>
  )
}

export default Home
