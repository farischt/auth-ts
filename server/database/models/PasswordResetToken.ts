import { Model, DataTypes, Optional, Op } from "sequelize"

interface PasswordResetTokenAttributes {
  token: string
  userId: number
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date | null
}
interface PasswordResetTokenCreationAttributes
  extends Optional<PasswordResetTokenAttributes, "token"> {}

export class PasswordResetToken
  extends Model<
    PasswordResetTokenAttributes,
    PasswordResetTokenCreationAttributes
  >
  implements PasswordResetTokenAttributes
{
  declare token: string
  declare userId: number
  declare createdAt?: Date
  declare updatedAt?: Date
  declare deletedAt?: Date | null

  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models: any) {
    PasswordResetToken.belongsTo(models.User, {
      foreignKey: "userId",
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    })
  }

  static async getTokenByUserId(userId: number) {
    return await PasswordResetToken.findOne({
      where: {
        userId,
      },
    })
  }

  static async getValidToken(userId: number) {
    return await PasswordResetToken.findOne({
      where: {
        userId,
        createdAt: {
          [Op.gte]: Date.now() - 60 * 2 * 1000, // 10 minutes validity
        },
        deletedAt: null,
      },
    })
  }

  static async destroyUserInvalidToken(userId: number) {
    await PasswordResetToken.destroy({
      where: {
        userId,
        createdAt: {
          [Op.lt]: Date.now() - 60 * 2 * 1000, // 10 minutes validity
        },
      },
    })
  }

  toJSON() {
    return {
      token: this.token,
      userId: this.userId,
      createdAt: this.createdAt?.toString() || null,
      updatedAt: this.updatedAt?.toString() || null,
      deletedAt: this.deletedAt?.toString() || null,
    }
  }
}
const PasswordResetTokenModel = (sequelize: any) =>
  PasswordResetToken.init(
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
      modelName: "PasswordResetToken",
      paranoid: true,
    }
  )

export default PasswordResetTokenModel
