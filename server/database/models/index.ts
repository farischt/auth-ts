import UserModel, { User } from "./User"
import AuthTokenModel, { AuthToken } from "./AuthToken"
import AccountConfirmationTokenModel, {
  AccountConfirmationToken,
} from "./AccountConfirmationToken"

// Exporting model class
export { User }
export { AuthToken }
export { AccountConfirmationToken }

// Exporting model init
const Models = (sequelize: any) => {
  const User = UserModel(sequelize)
  const AuthToken = AuthTokenModel(sequelize)
  const AccountConfirmationToken = AccountConfirmationTokenModel(sequelize)

  return {
    User,
    AuthToken,
    AccountConfirmationToken,
  }
}

export default Models
