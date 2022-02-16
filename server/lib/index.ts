import { GetServerSidePropsContext } from "next"
import cookie from "cookie"
import formidable, { Fields, Files } from "formidable"

import { User, AuthToken } from "../database/models"
import Database from "@/server/database"

class Server {
  getIpAddress(context: GetServerSidePropsContext): any {
    return context.req.socket.remoteAddress
  }

  isUUID(id: string): boolean {
    const regexExp =
      /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi
    return regexExp.test(id)
  }

  setAuthCookie(context: GetServerSidePropsContext, token: string): void {
    context.res.setHeader(
      "Set-Cookie",
      cookie.serialize("authToken", token, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        maxAge: 60 * 60,
        path: "/",
      })
    )
  }

  deleteAuthCookie(context: GetServerSidePropsContext): void {
    context.res.setHeader(
      "Set-Cookie",
      cookie.serialize("authToken", "", {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        maxAge: 0,
        path: "/",
      })
    )
  }

  hasAuthTokenExpired(token: AuthToken): boolean {
    return token.createdAt
      ? Date.now() - new Date(token.createdAt).getTime() + 60 * 60 <= 0
      : true
  }

  async parseMultipart(context: any) {
    return await new Promise((resolve, reject) => {
      formidable().parse(
        context.req,
        (error: any, body: Fields, files: Files) => {
          if (error) return reject(error)
          context.req.body = body
          context.req.files = files
          return resolve({ body, files })
        }
      )
    })
  }

  async login(context: any, token: string): Promise<void> {
    this.setAuthCookie(context, token)
  }

  async logout(context: any): Promise<void> {
    const token =
      context.req.cookies.authToken &&
      this.isUUID(context.req.cookies.authToken) &&
      (await Database.AuthToken.findByPk(context.req.cookies.authToken))
    token && (await token.destroy())

    this.deleteAuthCookie(context)
  }

  async getAuthenticatedUser(context: any): Promise<User | null> {
    if (!context.req.cookies.authToken) return null
    const token =
      this.isUUID(context.req.cookies.authToken) &&
      (await Database.AuthToken.findByPk(context.req.cookies.authToken))

    if (!token) return null
    else if (this.hasAuthTokenExpired(token)) {
      this.deleteAuthCookie(context)
      await token.destroy()
      return null
    }
    return await Database.User.findByPk(token.userId)
  }
}

export default new Server()
