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
    console.log("index: ", data)
    return { props: { data } }
  } catch (error) {
    console.log(error)
    return {
      notFound: true,
    }
  }
  // use the data to render a apexChart
}

async function elasticData() {
  const url = `${process.env.NEXT_PUBLIC_ELASTIC_HOST}/api/elastic`

  const response = await fetch(url)
  console.log("response: ", response)

  // const data = await response.json()
  // console.log("data: ", data)
  // return data
  return "data kossa"
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
