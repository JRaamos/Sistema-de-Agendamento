import UserModel, { UserInputtableTypes, UserSequelizeModel } from '../database/models/user.model';
import { ServiceResponse } from '../types/ServiceResponse';

const userExists = async (
  phone: string,
  name: string,
  deviceId: string | null | undefined,
): Promise<number | boolean> => {
  const user = await UserModel.findOne({ where: { phone, name } });

  if (!user) return false;

  UserModel.update({ deviceId }, { where: { phone, name } });

  return user.dataValues.userId;
};

const createUserService = async (user: UserInputtableTypes):
Promise<ServiceResponse<number>> => {
  const { name, phone, deviceId } = user;
  const userExistsResult = await userExists(phone, name, deviceId);

  if (userExistsResult) return { status: 'SUCCESSFUL', data: userExistsResult as number };

  const userResult = await UserModel.create({ name, phone, deviceId });

  if (!userResult) {
    return { 
      status: 'INVALID_DATA', data: { message: 'invalid data' }, 
    };
  }
  
  const { userId } = userResult.dataValues;
  return { status: 'SUCCESSFUL', data: userId };
};

const getUserService = async (userId: number): Promise<ServiceResponse<UserSequelizeModel>> => {
  const user = await UserModel.findByPk(userId);

  if (!user) return { status: 'NOT_FOUND', data: { message: 'User not found' } };
  return { status: 'SUCCESSFUL', data: user as UserSequelizeModel };
};
export default { createUserService, getUserService };
