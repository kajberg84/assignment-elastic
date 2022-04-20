import React from "react"
import { Client } from "@elastic/elasticsearch"
import type { NextApiRequest, NextApiResponse } from "next"

//connect to Elasticsearch
export async function connectToElasticsearch() {
  const FINGERPRINT = process.env.NEXT_PUBLIC_FINGERPRINT!
  const ELASTIC_USER_NAME = process.env.NEXT_PUBLIC_ELASTIC_USER_NAME!
  const ELASTIC_USER_PASSWORD = process.env.NEXT_PUBLIC_ELASTIC_USER_PASSWORD!

  return new Client({
    node: "https://localhost:9200",
    auth: {
      username: ELASTIC_USER_NAME!,
      password: ELASTIC_USER_PASSWORD!,
    },
    tls: {
      ca: FINGERPRINT!,
      rejectUnauthorized: false,
    },
  })
}

export default async function searchElastic(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const client = await connectToElasticsearch()
    console.log("------------start client----------")

    if (
      process.env.NEXT_PUBLIC_FINGERPRINT &&
      process.env.NEXT_PUBLIC_ELASTIC_USER_NAME &&
      process.env.NEXT_PUBLIC_ELASTIC_USER_PASSWORD
    ) {
      const exists = await client.exists({
        index: "netflix_data",
        id: "jXc2RoABv8pN6_CUBg86",
      })
      const response = await client.search({
        index: "netflix_data",
        size: 100,
        query: {
          match: {
            title: "The",
          },
        },
      })
      console.log(response.hits.hits)
      console.log(exists)
    } else {
      throw new Error("Failed to connect to Elasticsearch")
    }

    console.log("------------end client----------")

    let results: any = []

    const response = await client.search({
      index: "netflix_data",
      size: 100,
      query: {
        match: {
          title: "The",
        },
      },
    })

    return res.send("kossa")
  } catch (error: any) {
    console.log(error)
    return res.status(error.statusCode || 500).json({ error: error.message })
  }
}
