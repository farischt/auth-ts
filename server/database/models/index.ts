import UserModel from "./user"
import TaskModel from "./task"

export default (sequelize: any) => {
  const User = UserModel(sequelize)
  const Task = TaskModel(sequelize)

  return {
    User,
    Task,
  }
}
