// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import list from "../../AGENTS_LIST.json"

type Data = Array<{
  "id": number,
  "name": string,
  "avatar": string,
  "income": number
}>

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ result: Data }>
) {
  if (req.method === "GET") {
    return res.status(200).json({ result: list })
  }
}
