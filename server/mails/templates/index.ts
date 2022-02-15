import * as fs from "fs"
import * as path from "path"

type Template = {
  [key: string]: string
}
const Template: Template = {}
const basename = path.basename(__filename)
const templateDirectory = path.resolve(process.cwd(), "server/mails/templates")

fs.readdirSync(templateDirectory)
  .filter((file: string) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-5) === ".html"
    )
  })
  .forEach((file: string) => {
    Template[file.slice(0, -5)] = file
  })

export default Template
