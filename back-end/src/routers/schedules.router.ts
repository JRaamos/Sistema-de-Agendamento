import { Router } from 'express';
import scheduleController from '../controllers/schedules.controller';

const routerSchedules = Router();

routerSchedules.post(
  '/schedules',
  scheduleController.finaAllSchedulesDate,
);

routerSchedules.post(
  '/schedules/:date/:hour', 
  scheduleController.findByScheduleDateId,
);

routerSchedules.get(
  '/schedules/:rageDays',
  scheduleController.countSchedules,
);

export default routerSchedules;