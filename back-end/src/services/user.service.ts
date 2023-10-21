import UserModel, { UserInputtableTypes } from '../database/models/user.model';

const createUserService = async (user: UserInputtableTypes):
Promise<number > => {
  const { name, phone } = user;

  const userResult = await UserModel.create({ name, phone });

  const { userId } = userResult.dataValues;
  return userId;
};

export default { createUserService };
