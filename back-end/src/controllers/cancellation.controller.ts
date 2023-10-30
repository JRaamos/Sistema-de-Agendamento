import { Request, Response } from 'express';
import schedulesService from '../services/schedules.service';
import CancellationModel from '../services/cancellation.service';

const createCancellation = async (req: Request, res: Response) => {
  const { dateonly, hour } = req.body;
  const scheduleResult = await schedulesService.findByScheduleDateId(dateonly, hour);

  if (!scheduleResult) {
    return res.status(404).send('Schedule not found');
  }

  const { scheduleId, date, userId } = scheduleResult.dataValues;

  const newCancellation = {
    scheduleId,
    dateSchedule: date,
    userId,
  };

  await CancellationModel(newCancellation);
  await schedulesService.deleteSchedule(scheduleId);

  return res.status(200).end();
};

export default { createCancellation };