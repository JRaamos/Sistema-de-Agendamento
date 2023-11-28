import { Request, Response } from 'express';
import userService from '../services/user.service';
import schedule from '../services/schedules.service';
import servicesAll from '../services/service.service';
import scheduleService from '../services/scheduleService.service';

const CreateRegister = async (req: Request, res: Response) => {
  const { name, phone, date, hour, services, eventId, deviceId } = req.body;

  const user = await userService.createUserService({ name, phone, deviceId });

  const servicesIds = await servicesAll.findAllService(services);

  if (user.status === 'SUCCESSFUL') {
    const scheduleData = {
      date,
      hour,
      userId: user.data,
      eventId,
    };
    const scheduleResult = await schedule.createSchedule(scheduleData);
    servicesIds.forEach(async (serviceId) => {
      await scheduleService.createScheduleService(scheduleResult.scheduleId, serviceId);
    });
    return res.status(200).json({ user, scheduleResult });
  }
  return res.status(400).json(user.data);
};

export default { CreateRegister };