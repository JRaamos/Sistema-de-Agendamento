import { Router } from 'express';
import dayOffController from '../controllers/dayOff.controller';
import validateJWT from '../middlewares/validateJWT';

const routerDayOff = Router();

routerDayOff.get(
  '/dayOff',
  dayOffController.getDayOffs,
);

routerDayOff.post(
  '/dayOff',
  validateJWT,
  dayOffController.createDayOff,
);

routerDayOff.delete(
  '/dayOff/:date',
  dayOffController.deleteDayOff,
);

export default routerDayOff;