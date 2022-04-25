//@ts-nocheck


import type { NextApiRequest, NextApiResponse } from "next"
import { elasticSearchClient } from "../../components/elasticConnector"
import { searchQuery2 } from "../../components/elasticQuery"
import fs from "fs-extra"



async function searchElastic() {
  try {
    // Creating ES client
    const client = await elasticSearchClient()

    // try {
    // await client.indices.delete({
    //   index: "movies",
    // })

    // } catch (error) {
    //   console.log("error")
    // }

    // const count = await client.count({ index: "movies" })
    // console.log(count)

    // Creating search query
    const query: any = searchQuery2()

    // Searching with query
    const response = await client.search(query)

    const allBuckets: any = []
    const aggre: any = response.aggregations

    // om jag vill se hur datan ser ut
    // console.log(aggre)

    aggre.reldate_popu.buckets.forEach((item: any) => {
      allBuckets.push(item)
    })
    // console.log(allBuckets)
    return allBuckets
  } catch (error: any) {
    console.log(error.message)
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const aggregations = await searchElastic()
  res.status(200).json({ aggregations })
}
