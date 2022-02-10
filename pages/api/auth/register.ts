import type { NextApiRequest, NextApiResponse } from "next"
import Database from "@/server/database"

interface RegistrationInput {
  email: string
  firstName: string
  lastName: string
  password: string
  repeatPassword: string
}

interface ExtendedNextApiRequest extends NextApiRequest {
  body: RegistrationInput
}

export default async function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    if (typeof req.body.email !== "string") {
      res.statusCode = 400
      return res.json({ error: "missing_email" })
    } else if (typeof req.body.firstName !== "string") {
      res.statusCode = 400
      return res.json({ error: "missing_first_name" })
    } else if (typeof req.body.lastName !== "string") {
      res.statusCode = 400
      return res.json({ error: "missing_last_name" })
    } else if (typeof req.body.password !== "string") {
      res.statusCode = 400
      return res.json({ error: "missing_password" })
    } else if (typeof req.body.repeatPassword !== "string") {
      res.statusCode = 400
      return res.json({ error: "missing_repeat_password" })
    }

    if (req.body.password !== req.body.repeatPassword) {
      res.statusCode = 400
      return res.json({ error: "passwords_are_not_the_same" })
    } else if (req.body.password.length < 8) {
      res.statusCode = 400
      return res.json({ error: "password_too_short" })
    } else if (!req.body.password.match(/[a-z]/g)) {
      res.statusCode = 400
      return res.json({ error: "password_lowercase_weakness" })
    } else if (!req.body.password.match(/[A-Z]/g)) {
      res.statusCode = 400
      return res.json({ error: "password_uppercase_weakness" })
    } else if (!req.body.password.match(/[0-9]/g)) {
      res.statusCode = 400
      return res.json({ error: "password_number_weakness" })
    } else if (!req.body.password.match(/[^0-9a-zA-Z\s]/g)) {
      res.statusCode = 400
      return res.json({ error: "password_special_weakness" })
    }

    const email = req.body.email.trim()

    if (await Database.User.emailTaken(email)) {
      res.statusCode = 400
      return res.json({ error: "email_taken" })
    }

    const { firstName, lastName, password } = req.body
    const user = Database.User.build({
      firstName,
      lastName,
      email,
      password: null,
    })

    await user.setPassword(password)
    await user.save()

    res.statusCode = 200
    res.json({ success: true })
  } else {
    res.statusCode = 405
    res.json({ error: "method_not_allowed" })
  }
}