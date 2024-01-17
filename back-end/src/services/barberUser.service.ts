import bccrypt from 'bcryptjs';
import BarberUserModel from '../database/models/barberUser.model';
import jwt from '../utils/jwt.utils';

const loginBarber = async (email: string, password: string) => {
  const barber = await BarberUserModel.findOne({
    where: { email },
  });

  if (!barber) {
    return { mensage: 'Email is incorrect' };
  }

  const isPasswordCorrect = bccrypt.compareSync(password, barber?.dataValues.password as string);

  if (!isPasswordCorrect) {
    return { mensage: 'Password is incorrect' };
  }
  const token = jwt.generetToken({ email, password });

  return { mensage: token };
};

export default { loginBarber };
