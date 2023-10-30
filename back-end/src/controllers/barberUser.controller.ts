import { Request, Response } from 'express';
import BarberUserService from '../services/barberUser.service';

const loginBarber = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const result = await BarberUserService.loginBarber(email, password);
  return res.status(200).json(result);
};

export default { loginBarber };