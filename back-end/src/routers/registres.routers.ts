import { Router } from 'express';
import registerController from '../controllers/register.controller';

const routerRegistre = Router();

routerRegistre.post('/registre', registerController.CreateRegister);

export default routerRegistre;