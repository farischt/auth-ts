import UserModel, { User } from "./User"
import AuthTokenModel, { AuthToken } from "./AuthToken"
import AccountConfirmationTokenModel, {
  AccountConfirmationToken,
} from "./AccountConfirmationToken"
import PasswordResetTokenModel, {
  PasswordResetToken,
} from "./PasswordResetToken"

// Exporting model class
export { User }
export { AuthToken }
export { AccountConfirmationToken }
export { PasswordResetToken }

// Exporting model init
const Models = (sequelize: any) => {
  const User = UserModel(sequelize)
  const AuthToken = AuthTokenModel(sequelize)
  const AccountConfirmationToken = AccountConfirmationTokenModel(sequelize)
  const PasswordResetToken = PasswordResetTokenModel(sequelize)

  return {
    User,
    AuthToken,
    AccountConfirmationToken,
    PasswordResetToken,
  }
}

export default Models
