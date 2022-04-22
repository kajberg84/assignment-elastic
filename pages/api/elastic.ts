//@ts-nocheck

import React from "react"

import type { NextApiRequest, NextApiResponse } from "next"
import { elasticSearchClient } from "../../components/elasticConnector"
import { searchQuery } from "../../components/elasticQuery"

async function searchElastic() {
  try {
    console.log("inne i searchElastic")

    // Creating ES client
    const client = await elasticSearchClient()

    // Creating search query
    const query: any = searchQuery()

    // Searching with query
    const response = await client.search(query)

    const allBuckets = []
    response?.aggregations?.reldate_popu.buckets.forEach((item: any) => {
      allBuckets.push(item)
    })

    return allBuckets
  } catch (error: any) {
    console.log(error.message)
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("inne i elastic handler")
  const aggregations = await searchElastic()
  res.status(200).json({ aggregations })
}
