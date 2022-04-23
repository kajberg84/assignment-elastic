import type { NextApiRequest, NextApiResponse } from "next"
import { elasticSearchClient } from "../../components/elasticConnector"
import { searchQuery } from "../../components/elasticQuery"
/**
 * Function for getting the data from elastic search
 *
 * @return {*}
 */
async function searchElastic() {
  try {
    // Creating ES client
    const client = await elasticSearchClient()

    // Creating search query
    const query: any = searchQuery()

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
