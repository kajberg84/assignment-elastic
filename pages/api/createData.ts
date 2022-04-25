//@ts-nocheck

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

   const data = fs.readFileSync(url, { encoding: "utf8" })

   const rows = data.split(/\r\n|\n/)
   const headings = rows[0].split(",")
   const newArray = []

   for (let row = 1; row < rows.length; row++) {
     const object = {}
     let headingIndex = 0
     let item = ""
     // Changing csv for easier handling
     for (let i = 0; i < rows[row].length; i++) {
       if (rows[row].charAt(i) === ",") {
         if (rows[row].charAt(i + 1) !== " ") {
           object[headings[headingIndex]] = item
           headingIndex++
           item = ""
         } else {
           item += rows[row].charAt(i)
         }
       } else {
         item += rows[row].charAt(i)
       }
     }
     newArray.push(object)
   }

   newArray.map((item) => {
     item.budget = parseInt(item.budget)
   })

   return newArray
 }

 async function createData() {
  const client = await elasticSearchClient()

   await client.indices.delete({
     index: "movies",
   })
   const data = await convertCSVtoArray("./data/movies.csv")
   // Set indexes and id for all documents
   await client.indices.create(
     {
       index: "movies",
       operations: {
         mappings: {
           properties: {
             id: { type: "integer" },
             text: { type: "text" },
             user: { type: "keyword" },
             time: { type: "date" },
           },
         },
       },
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
     console.log("Bulk indexing errors")
     console.log(bulkResponse.errors)
   } else {
     console.log("Bulk indexing successful")
   }
 }

 export default async function handler(
   req: NextApiRequest,
   res: NextApiResponse
 ) {
   const data = await createData()
   res.status(200).json({ data })
 }
