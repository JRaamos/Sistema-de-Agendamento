import { Router } from 'express';
import scheduleController from '../controllers/schedules.controller';

const routerSchedules = Router();

routerSchedules.post('/schedules', scheduleController.finaAllSchedulesDate);
export default routerSchedules;