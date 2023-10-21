import { Request, Response } from 'express';
import userService from '../services/user.service';
import service from '../services/service.service';
import schedule from '../services/schedules.service';

const CreateRegister = async (req: Request, res: Response) => {
  const { name, phone, date, hour, services } = req.body;

  const user = await userService.createUserService({ name, phone });
  const serviceIds = await service.createService({ services, userId: user }); 

  const scheduleData = {
    date,
    hour,
    userId: user,
    serviceId: serviceIds,
  };

  const scheduleResult = await schedule.createSchedule(scheduleData);

  return res.status(200).json({ user, serviceIds, scheduleResult });
};

export default { CreateRegister };