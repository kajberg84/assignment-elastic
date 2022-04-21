//@ts-nocheck

import React from "react"

import type { NextApiRequest, NextApiResponse } from "next"
import { connectToElasticsearch } from "../../components/elasticConnector"
import { searchQuery } from "../../components/elasticQuery"

export async function searchElastic(req: NextApiRequest, res: NextApiResponse) {
  try {
    // returning elastic client
    const client = await connectToElasticsearch()

    // query elastic
    const query = searchQuery()

    // search elastic with query
    const response = await client.search(query)

    // console.log(response?.aggregations["0"].buckets)
    // console.log(response)

    // let results: any = []
    // response.aggregations["0"].buckets.forEach((bucket: any) => {
    //   results.push({
    //     date: bucket.key_as_string,
    //     popularity: bucket["1"].value,
    //   })
    // })
    return response
  } catch (error: any) {
    console.log(error)
    return res.status(error.statusCode || 500).json({ error: error.message })
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("inne i elastic handler")
  const data = await searchElastic()
  res.status(200).json({ data })
}
