import { Request, Response } from 'express';
import userService from '../services/user.service';
import schedule from '../services/schedules.service';
import servicesAll from '../services/service.service';
import scheduleService from '../services/scheduleService.service';

// eslint-disable-next-line max-lines-per-function
const CreateRegister = async (req: Request, res: Response) => {
  const { name, phone, date, hour, services } = req.body;

  const user = await userService.createUserService({ name, phone });
  const servicesIds = await servicesAll.findAllService(services);

  const scheduleData = {
    date,
    hour,
    userId: user,
  };

  const scheduleResult = await schedule.createSchedule(scheduleData);
  servicesIds.forEach(async (serviceId) => {
    await scheduleService.createScheduleService(scheduleResult.scheduleId, serviceId);
  });

  return res.status(200).json({ user, scheduleResult });
};

export default { CreateRegister };