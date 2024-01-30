import { Router } from 'express';
import serviceController from '../controllers/service.controller';

const routerService = Router();

routerService.get(
  '/service/:name',
  serviceController.findBybServiceName,
);

routerService.put(
  '/service/:name',
  serviceController.updateServiceByName,
);

export default routerService;