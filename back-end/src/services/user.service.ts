import UserModel, { UserInputtableTypes } from '../database/models/user.model';
import { ServiceResponse } from '../types/ServiceResponse';
import { User } from '../types/User';

const createUserService = async (user: UserInputtableTypes):Promise<ServiceResponse<User>> => {
  const { name, phone } = user;

  if (!name || !phone) {
    return {
      status: 'INVALID_DATA',
      data: { message: 'Name and phone are required' },
    };
  }

  const userResult = await UserModel.create({ name, phone });
  return { status: 'SUCCESSFUL', data: userResult.dataValues };
};

export default createUserService;
