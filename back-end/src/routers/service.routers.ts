import { Router } from 'express';
import serviceController from '../controllers/service.controller';
import validateJWT from '../middlewares/validateJWT';
import servicePriceValidation from '../middlewares/service.middlewraes';

const routerService = Router();

routerService.get(
  '/services',
  serviceController.getAllService,
);

routerService.put(
  '/service/:name',
  validateJWT,
  servicePriceValidation,
  serviceController.UpdatePriceServiceByName,
);

export default routerService;