import type { GetServerSidePropsContext, NextPage } from "next"
import Head from "next/head"
import Image from "next/image"
import { render } from "react-dom"
import elastic from "./api/elastic"
import searchElastic from "./api/elastic"

interface Props {
  data: []
}

//get serversideprops
export async function getServerSideProps({ props }: any) {
  try {
    console.log("get serverside props")

    const data = await elasticData()
    // console.log("data recieved: ", data)
    console.log("--------")
    console.log(data)
    return { props: { data } }
  } catch (error) {
    console.log(error)
    return {
      notFound: true,
    }
  }
}

async function elasticData() {
  const url = `${process.env.NEXT_PUBLIC_HOST}/api/elastic`

  const response = await fetch(url)

  const data = await response.json()
  return data
}


export default function Home(props: Props) {
  return (
    <div>
      <Head>
        <title>Elastic assignment</title>
      </Head>
      <h1>Elastic assignment</h1>
    </div>
  )
}
