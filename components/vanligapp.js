import { Client } from "@elastic/elasticsearch"
import "dotenv/config"

async function main() {
  const client = new Client({
    node: "https://localhost:9200",
    auth: {
      username: "elastic",
      password: process.env.ELASTIC_USER_PASSWORD,
    },
    tls: {
      ca: process.env.FINGERPRINT,
      rejectUnauthorized: false,
    },
  })

  const response = await client.search({
    index: "netflixdata",
    size: 100,
    query: {
      match: {
        title: "The",
      },
    },
  })

  console.log(response.hits.hits)
  console.log(response.hits.hits.length)
}

main()
