import type { NextApiRequest, NextApiResponse } from "next"
import Server from "server/lib"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    if (!(await Server.getAuthenticatedUser({ req, res }))) {
      res.statusCode = 401
      return res.json({ error: "not_authenticated" })
    }

    await Server.logout({ req, res })
    res.statusCode = 200
    res.json({ loggedOut: true })
  } else {
    res.statusCode = 405
    res.json({ error: "method_not_allowed" })
  }
}
