import { Router } from 'express';
import loginBarberController from '../controllers/barberUser.controller';

const routerLogin = Router();

routerLogin.post(
  '/login', 
  loginBarberController.loginBarber,
);

export default routerLogin;