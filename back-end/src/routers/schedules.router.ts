import { Router } from 'express';
import scheduleController from '../controllers/schedules.controller';

const routerSchedules = Router();

routerSchedules.get(
  '/schedules/:date',
  scheduleController.finaAllSchedulesDate,
);

routerSchedules.get(
  '/schedules/:date/:hour',
  scheduleController.findByScheduleDateId,
);

routerSchedules.get(
  '/schedules/:intervalDays',
  scheduleController.countSchedules,
);

export default routerSchedules;