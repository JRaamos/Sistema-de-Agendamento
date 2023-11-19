import UserModel, { UserInputtableTypes, UserSequelizeModel } from '../database/models/user.model';

const userExists = async (phone: string, name: string, deviceId: string | null | undefined): Promise<number | boolean> => {
  const user = await UserModel.findOne({ where: { phone, name } });

  if (!user) return false;
  UserModel.update({ deviceId }, { where: { phone, name } })

  return user.dataValues.userId;
}

const createUserService = async (user: UserInputtableTypes):
Promise<number > => {
  const { name, phone, deviceId } = user;
const userExistsResult = await userExists(phone, name, deviceId);

  if(userExistsResult) return userExistsResult as number;

  const userResult = await UserModel.create({ name, phone, deviceId });

  const { userId } = userResult.dataValues;
  return userId;
};

const getUserService = async (userId: number): Promise<UserSequelizeModel> => {
  const user = await UserModel.findByPk(userId);
  return user as UserSequelizeModel;
}
export default { createUserService, getUserService };
