import type { GetServerSidePropsContext, NextPage } from "next"
import Head from "next/head"
import Image from "next/image"
import { render } from "react-dom"
import elastic from "./api/elastic"
import searchElastic from "./api/elastic"
import SampleLine from "../components/elasticChart"
import React from "react"

interface Props {
  data: []
}

//get serversideprops
export async function getServerSideProps({ props }: any) {
  try {
    let xSampleData: any = []
    let ySampleData: any = []
    console.log("get serverside props")

    const data = await elasticData()

    data.aggregations
      .filter((item: any) => item["1"].value)
      .forEach((item: any) => {
        ySampleData.push(item["1"].value)
        xSampleData.push(item.key_as_string.substring(0, 10))
      })

    return {
      props: {
        data: {
          xSampleData,
          ySampleData,
        },
      },
    }
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

export default function Home({ data }: { data: any }) {
  const [xData, setXData] = React.useState(data.xSampleData)
  const [yData, setYData] = React.useState(data.ySampleData)

  return (
    <div style={{ height: "100vh" }}>
      <Head>
        <title>Elastic assignment</title>
      </Head>
      <h1>Elastic assignment</h1>
      <SampleLine xData={xData} yData={yData} />
    </div>
  )
}
