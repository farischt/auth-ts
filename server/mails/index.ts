import * as nodemailer from "nodemailer"
import * as handlebars from "handlebars"
import * as fs from "fs"
import * as path from "path"
import CONFIG from "./config/config.json"

export default class EmailServer {
  static readonly transporter = nodemailer.createTransport({
    host: CONFIG.CREDENTIALS.HOST,
    port: CONFIG.CREDENTIALS.PORT,
    secure: CONFIG.CREDENTIALS.SECURE,
    auth: {
      user: CONFIG.CREDENTIALS.AUTH.USER,
      pass: CONFIG.CREDENTIALS.AUTH.PASS,
    },
  })

  static readonly templateDir = path.resolve(
    process.cwd(),
    "server/mails/templates"
  )
  static readonly shownEmail = CONFIG.SHOWN_EMAIL

  private static createMailOptions(to: string, subject: string, html: string) {
    return {
      from: this.shownEmail,
      to,
      subject,
      html,
    }
  }

  private static getTemplate(file: string) {
    const filePath = path.join(this.templateDir, file)
    const source = fs.readFileSync(filePath, "utf-8").toString()
    return handlebars.compile(source)
  }

  public static async sendMail(
    email: string,
    context: any,
    file: string,
    subject: string
  ) {
    const template = this.getTemplate(file)
    const htmlToSend = template(context)
    const mailOptions = this.createMailOptions(email, subject, htmlToSend)
    try {
      await this.transporter.sendMail(mailOptions)
    } catch (error: any) {
      console.log(
        `Email not sent due to the following error : ${error.message}`
      )
    }
  }
}
