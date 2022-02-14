import { Model, DataTypes, Optional } from "sequelize"

interface AccountConfirmationTokenAttributes {
  token: string
  userId: number
  createdAt?: Date
  updatedAt?: Date
}
interface AccountConfirmationTokenCreationAttributes
  extends Optional<AccountConfirmationTokenAttributes, "token"> {}

export class AccountConfirmationToken
  extends Model<
    AccountConfirmationTokenAttributes,
    AccountConfirmationTokenCreationAttributes
  >
  implements AccountConfirmationTokenAttributes
{
  declare token: string
  declare userId: number
  declare createdAt?: Date
  declare updatedAt?: Date

  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models: any) {
    AccountConfirmationToken.belongsTo(models.User, {
      foreignKey: "userId",
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    })
  }

  toJSON() {
    return {
      token: this.token,
      userId: this.userId,
      createdAt: this.createdAt?.toString() || null,
      updatedAt: this.updatedAt?.toString() || null,
    }
  }
}
export default (sequelize: any) =>
  AccountConfirmationToken.init(
    {
      token: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        references: {
          model: "User",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "AccountConfirmationToken",
    }
  )
