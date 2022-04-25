import Head from "next/head"
import React from "react"
import SimpleChart from "../components/elasticChart"

interface Props {
  data: []
}

// Get serversideprops
export async function getServerSideProps({ props }: any) {
  try {
    let xSampleData: any = []
    let ySampleData: any = []

    const data = await elasticData()

    // Itterate over the data and get the year and average popularity
    // Filter away the "null" values
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
      props: {
        data: {
          xSampleData: [],
          ySampleData: [],
        },
      },
      // notFound: true,
    }
  }
}
/**
 * Fetcing elastic data
 *
 * @return { object } - elastic data
 */
async function elasticData() {
  const url = `${process.env.NEXT_PUBLIC_HOST}/api/elastic`

  const response = await fetch(url)

  const data = await response.json()
  return data
}
/**
 * Render main page
 *
 * @export
 * @param {{ data: any }} { data }
 * @return {*}
 */
export default function Home({ data }: { data: any }) {
  const [xData, setXData] = React.useState(data.xSampleData)
  const [yData, setYData] = React.useState(data.ySampleData)

  return (
    <div style={{ height: "100vh" }}>
      <Head>
        <title>Elastic assignment</title>
      </Head>
      <h1>Sum budget spent on movies 1925 - 2016</h1>
      <SimpleChart xData={xData} yData={yData} />
      <div>
        <button> action </button>
        <button> drama </button>
        <button> thriller </button>
      </div>
    </div>
  )
}
