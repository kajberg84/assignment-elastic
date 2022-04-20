// @ts-nocheck

import React from "react"
import { Client } from "@elastic/elasticsearch"
import type { NextApiRequest, NextApiResponse } from "next"

//connect to Elasticsearch
export async function connectToElasticsearch() {
  const FINGERPRINT = process.env.NEXT_PUBLIC_FINGERPRINT!
  const ELASTIC_USER_NAME = process.env.NEXT_PUBLIC_ELASTIC_USER_NAME!
  const ELASTIC_USER_PASSWORD = process.env.NEXT_PUBLIC_ELASTIC_USER_PASSWORD!
  console.log(FINGERPRINT)
  console.log(ELASTIC_USER_NAME)
  console.log(ELASTIC_USER_PASSWORD)
  if (!FINGERPRINT || !ELASTIC_USER_NAME || !ELASTIC_USER_PASSWORD) {
    return "ERR_ENV_NOT_DEFINED"
  }

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
    console.log(client)
    console.log("------------end client----------")

    let results: any = []

    // const response = await client.search({
    //   index: "netflixdata",
    //   size: 100,
    //   query: {
    //     match: {
    //       title: "The",
    //     },
    //   },
    // })

    console.log(client)

    return res.send(client)
  } catch (error: any) {
    console.log(error)
    return res.status(error.statusCode || 500).json({ error: error.message })
  }
}
