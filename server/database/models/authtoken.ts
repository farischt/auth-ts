import { Sequelize, Model, DataTypes, Optional } from "sequelize"

interface AuthTokenAttributes {
  token: string
  userId: number
  createdAt?: Date
  updatedAt?: Date
}
interface AuthTokenCreationAttributes
  extends Optional<AuthTokenAttributes, "token"> {}

export class AuthToken
  extends Model<AuthTokenAttributes, AuthTokenCreationAttributes>
  implements AuthTokenAttributes
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
    AuthToken.belongsTo(models.User, {
      foreignKey: "userId",
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    })
  }
}
export default (sequelize: any) =>
  AuthToken.init(
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
      modelName: "AuthToken",
    }
  )
