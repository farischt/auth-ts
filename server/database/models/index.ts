import UserModel, { User } from "./user"
import AuthTokenModel, { AuthToken } from "./authtoken"

// Exporting model class
export { User }
export { AuthToken } 

// Exporting model init
export default (sequelize: any) => {
  const User = UserModel(sequelize)
  const AuthToken = AuthTokenModel(sequelize)

  return {
    User,
    AuthToken,
  }
}

