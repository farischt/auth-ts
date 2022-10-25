import type { NextApiRequest, NextApiResponse } from "next"

import Server from "server/lib"
import Database from "server/database"
import type { LoginInput, LoginOutput, ApiError } from "client/types"

interface ExtendedNextApiRequest extends NextApiRequest {
  body: LoginInput
}

export default async function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse<LoginOutput | ApiError>
) {
  if (req.method === "POST") {
    if (typeof req.body.email !== "string") {
      res.statusCode = 400
      return res.json({ error: "missing_email" })
    } else if (typeof req.body.password !== "string") {
      res.statusCode = 400
      return res.json({ error: "missing_first_name" })
    }

    try {
      if (await Server.getAuthenticatedUser({ req, res })) {
        res.statusCode = 403
        return res.json({ error: "already_logged_in" })
      }

      const user = await Database.User.getByEmail(req.body.email)
      if (!user) {
        res.statusCode = 401
        return res.json({ error: "invalid_credentials" })
      } else if (!(await user.checkPassword(req.body.password))) {
        res.statusCode = 401
        return res.json({ error: "invalid_credentials" })
      } else if (!user.verified) {
        res.statusCode = 401
        return res.json({ error: "invalid_credentials" })
      }

      const authToken = await Database.AuthToken.create({
        userId: user.id,
      })
      await Server.login({ req, res }, authToken.token)
      res.statusCode = 200
      res.json({
        loggedIn: true,
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      })
    } catch (error) {
      res.statusCode = 500
      res.json({ error: "internal_server_error" })
    }
  } else {
    res.statusCode = 405
    res.json({ error: "method_not_allowed" })
  }
}
