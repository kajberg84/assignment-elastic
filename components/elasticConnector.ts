import { Client } from "@elastic/elasticsearch"

/**
 * Returns a client for elasticsearch
 *
 * @export
 * @return { Client }
 */

export async function elasticSearchClient() {
  const FINGERPRINT = process.env.NEXT_PUBLIC_FINGERPRINT!
  const ELASTIC_USER_NAME = process.env.NEXT_PUBLIC_ELASTIC_USER_NAME!
  const ELASTIC_USER_PASSWORD = process.env.NEXT_PUBLIC_ELASTIC_USER_PASSWORD!
  const ELASTIC_HOST = process.env.NEXT_PUBLIC_ELASTIC_HOST!

  return new Client({
    node: ELASTIC_HOST,
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
