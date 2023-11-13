import { Router } from 'express';
import scheduleController from '../controllers/schedules.controller';
import validateJWT from '../middlewares/validateJWT';

const routerSchedules = Router();

routerSchedules.get(
  '/schedules',
  scheduleController.findAllSchedulesFromNow,
);

routerSchedules.get(
  '/schedules/date/:date',
  scheduleController.finaAllSchedulesDate,
);

routerSchedules.get(
  '/schedules/date/:date/hour/:hour',
  scheduleController.findByScheduleDateId,
);
routerSchedules.get(
  '/schedules/count/future',
  validateJWT,
  scheduleController.countFutureSchedules,
);

routerSchedules.get(
  '/schedules/count/:intervalDays',
  validateJWT,
  scheduleController.countSchedules,
);

export default routerSchedules;
