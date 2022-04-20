//@ts-nocheck
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
      const response = await client.search({
        index: "movies",
        body: {
          aggs: {
            "0": {
              date_histogram: {
                field: "release_date",
                fixed_interval: "365d",
                time_zone: "Europe/Stockholm",
              },
              aggs: {
                "1": {
                  avg: {
                    field: "popularity",
                  },
                },
              },
            },
          },
          size: 0,
          fields: [
            {
              field: "@timestamp",
              format: "date_time",
            },
            {
              field: "release_date",
              format: "date_time",
            },
          ],
          script_fields: {},
          stored_fields: ["*"],
          runtime_mappings: {},
          _source: {
            excludes: [],
          },
          query: {
            bool: {
              must: [],
              filter: [
                {
                  range: {
                    release_date: {
                      format: "strict_date_optional_time",
                      gte: "1940-02-22T23:00:00.000Z",
                      lte: "2016-08-16T22:00:00.000Z",
                    },
                  },
                },
              ],
              should: [],
              must_not: [],
            },
          },
        },
      })
      console.log(response?.aggregations["0"].buckets)

      let results: any = []

      response.aggregations["0"].buckets.forEach((bucket: any) => {
        results.push({
          date: bucket.key_as_string,
          popularity: bucket["1"].value,
        })
      })

      console.log(results)
    } else {
      throw new Error("Failed to connect to Elasticsearch")
    }

    console.log("------------end client----------")

    // skapa upp funktioner för allt

    return res.send("kossa")
  } catch (error: any) {
    console.log(error)
    return res.status(error.statusCode || 500).json({ error: error.message })
  }
}
