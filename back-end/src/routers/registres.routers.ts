import { Router } from 'express';
import registerController from '../controllers/register.controller';
import registerValidate from '../middlewares/registre.middlewares';

const routerRegistre = Router();

routerRegistre.post(
  '/registre',
  registerValidate.validadeSchedule,
  registerValidate.validateService,
  registerValidate.validateUser,
  registerController.CreateRegister,
);

export default routerRegistre;