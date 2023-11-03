import { Router } from 'express';
import scheduleController from '../controllers/schedules.controller';

const routerSchedules = Router();

routerSchedules.get(
  '/schedules/date/:date',
  scheduleController.finaAllSchedulesDate,
);

routerSchedules.get(
  '/schedules/date/:date/hour/:hour',
  scheduleController.findByScheduleDateId,
);

routerSchedules.get(
  '/schedules/count/:intervalDays',
  scheduleController.countSchedules,
);

export default routerSchedules;
