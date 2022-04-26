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
    }
  }
}
/**
 * Fetching elastic data
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
  const [label, setLabel] = React.useState("type")

  function alertFunction(item: string) {
    alert(`I have not implemented the buttons yet: ${item}`);
  }

  const buttonEnum: string[] = [
    "Action",
    "Drama",
    "Comedy",
    "Thriller",
    "Horror",
    "Sci-Fi",
    "Adventure",
  ]
  // TODO
  // när jag klickar så ska useeffect ändra statet.
  //Hämta en query från elasticsearch och lägg till det i state.

  return (
    <div style={{ height: "100vh" }}>
      <Head>
        <title>Elastic assignment</title>
      </Head>
      <h1>Sum budget spent on all movies 1960 - 2016</h1>
      <SimpleChart xData={xData} yData={yData} />
      <div className="mt20">
  
        {buttonEnum.map((item: string) => (
          <button
          className="button"
            key={item}
            onClick={() => {
              alertFunction(item)
            }}
          >
            {item}
          </button>
        ))}
      </div>
      <p> </p>
    </div>
  )
}
        // <button className="button" role="button">
        //   Action
        // </button>

