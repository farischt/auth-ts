import { Dialect, Sequelize } from "sequelize"
import Models from "./models/index"
import * as config from "./config/config.json"

const env = process.env.NODE_ENV || "development"
const sequelize = new Sequelize(
  config[env].database,
  config[env].username,
  config[env].password,
  {
    host: config[env].host,
    dialect: config[env].dialect as Dialect,
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
)

const models = Models(sequelize)
Object.keys(models).forEach((key) => {
  // @ts-ignore
  if (models[key].associate) {
    console.log("done")
    // @ts-ignore
    models[key].associate(models)
  }
})
const sync = false

;(async () => {
  if (sync) {
    console.log("Syncronizing all models")
    // await sequelize.sync({ force: true })
    // await models.Post.sync({ force: true })
  }
})()

export default { sequelize, ...models }
