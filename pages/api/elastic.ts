//@ts-nocheck

import client from "@elastic/elasticsearch/lib/client"
import type { NextApiRequest, NextApiResponse } from "next"
import { elasticSearchClient } from "../../components/elasticConnector"
import { searchQuery2 } from "../../components/elasticQuery"
import fs from "fs-extra"

/**
 * Reading CSV file and returning array of objects
 *
 * @param {*} url
 * @return {*}
 */
async function convertCSVtoArray(url) {
  const data = await fs.readFile(url, "utf8")
  const lines = data.split("\n")
  const result = []
  const headers = lines[0].split(",")
  for (let i = 1; i < lines.length; i++) {
    const obj = {}
    const currentline = lines[i].split(",")
    for (let j = 0; j < headers.length; j++) {
      obj[headers[j]] = currentline[j]
    }
    result.push(obj)
  }
  return result
}

async function bulkData(data) {
  try {
    // Creating movies index
    await client.indices.create(
      {
        index: "movies",
      },
      { ignore: [400] }
    )

    // Create operations for bulk indexing
    const operations = data.flatMap((doc) => [
      { index: { _index: "movies" } },
      doc,
    ])

    // Bulk indexing data for the elastic client
    const bulkResponse = await client.bulk({ refresh: true, operations })
    if (bulkResponse.errors) {
      const erroredDocuments = []
      // Itterate through errored documents and logging them
      bulkResponse.items.forEach((action, i) => {
        const operation = Object.keys(action)[0]
        if (action[operation].error) {
          erroredDocuments.push({
            status: action[operation].status,
            error: action[operation].error,
            operation: body[i * 2],
            document: body[i * 2 + 1],
          })
        }
      })
      console.log(erroredDocuments)
    }
  } catch (error) {}
}

async function searchElastic() {
  try {
    // Creating ES client
    const client = await elasticSearchClient()

    // READ CSV FILE
    const data = await convertCSVtoArray("./data/movies.csv")
    console.log(data)

    // Set indexes and id for all documents
    await client.indices.create(
      {
        index: "movies",
      },
      { ignore: [400] }
    )

    // Create operations for bulk indexing
    const operations = data.flatMap((doc) => [
      { index: { _index: "movies" } },
      doc,
    ])

    // Bulk indexing data for the elastic client
    const bulkResponse = await client.bulk({ refresh: true, operations })
    if (bulkResponse.errors) {
      const erroredDocuments = []
      // Itterate through errored documents and logging them
      bulkResponse.items.forEach((action, i) => {
        const operation = Object.keys(action)[0]
        if (action[operation].error) {
          erroredDocuments.push({
            status: action[operation].status,
            error: action[operation].error,
            operation: body[i * 2],
            document: body[i * 2 + 1],
          })
        }
      })
      console.log(erroredDocuments)
    }

    // Creating search query
    const query: any = searchQuery2()

    // Searching with query
    const response = await client.search(query)

    const allBuckets: any = []
    const aggre: any = response.aggregations

    aggre.reldate_popu.buckets.forEach((item: any) => {
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
  const aggregations = await searchElastic()
  res.status(200).json({ aggregations })
}
