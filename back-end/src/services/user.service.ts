import UserModel, { UserInputtableTypes, UserSequelizeModel } from '../database/models/user.model';

const createUserService = async (user: UserInputtableTypes):
Promise<number > => {
  const { name, phone } = user;

  const userResult = await UserModel.create({ name, phone });

  const { userId } = userResult.dataValues;
  return userId;
};
const getUserService = async (userId: number): Promise<UserSequelizeModel> => {
  const user = await UserModel.findByPk(userId);
  return user as UserSequelizeModel;
}
export default { createUserService, getUserService };
