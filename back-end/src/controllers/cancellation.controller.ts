import { Request, Response } from 'express';
import schedulesService from '../services/schedules.service';
import cancellationService from '../services/cancellation.service';
import { scheduleCancelation } from '../utils/corn-node';

const createCancellation = async (req: Request, res: Response) => {
  const { dateonly, hour } = req.body;
  const scheduleResult = await schedulesService.findByScheduleDateId(dateonly, hour);
  
  const now = new Date(Date.now());
  const brasiliaOffset = -3 * 60;
  const brasiliaTime = new Date(now.getTime() + brasiliaOffset * 60 * 1000);
  
  if (!scheduleResult) return res.status(404).send('Schedule not found');
  const { scheduleId, date, userId, user, eventId } = scheduleResult.dataValues;
  const newCancellation = {
    dateSchedule: date,
    dateCancellation: brasiliaTime,
    userId,
    eventId,
  };

  await cancellationService.createCancellation(newCancellation);

  if (user) await scheduleCancelation(user.name, date, hour, user.deviceId);
  
  await schedulesService.deleteSchedule(scheduleId);

  return res.status(200).end();
};

const countCancellation = async (req: Request, res: Response) => {
  const { intervalDays } = req.params;

  const result = await cancellationService.countCancellation(Number(intervalDays));

  return res.status(200).json({ result });
};

const getByCancellationDate = async (req: Request, res: Response) => {
  const { date } = req.params;
  const result = await cancellationService.getByCancellationDate(date);

  return res.status(200).json({ result });
};
export default { createCancellation, countCancellation, getByCancellationDate };