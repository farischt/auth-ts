import { Model, DataTypes, Optional } from "sequelize"

interface TaskAttributes {
  id: number
  title: string
  userId: number
}
interface TaskCreationAttributes extends Optional<TaskAttributes, "id"> {}

class Task
  extends Model<TaskAttributes, TaskCreationAttributes>
  implements TaskAttributes
{
  declare id: number
  declare title: string
  declare userId: number

  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models: any) {
    Task.belongsTo(models.User, {
      foreignKey: "userId",
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    })
  }
}
export default (sequelize: any) =>
  Task.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      title: DataTypes.STRING,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Task",
    }
  )
