import UserModel from "./user"
import AuthTokenModel from "./authtoken"

export default (sequelize: any) => {
  const User = UserModel(sequelize)
  const AuthToken = AuthTokenModel(sequelize)

  return {
    User,
    AuthToken,
  }
}
