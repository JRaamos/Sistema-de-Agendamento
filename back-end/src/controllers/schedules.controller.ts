import { Request, Response } from 'express';
import schedulesService from '../services/schedules.service';

const finaAllSchedulesDate = async (req: Request, res: Response) => {
  const { date } = req.params;
  const scheduleResult = await schedulesService.finaAllSchedulesDate(date);
  return res.status(200).json(scheduleResult);
};

const findByScheduleDateId = async (req: Request, res: Response) => {
  const { date, hour } = req.body;
  const scheduleResult = await schedulesService.findByScheduleDateId(date, hour);
  return res.status(200).json(scheduleResult);
};

const countSchedules = async (req: Request, res: Response) => {
  const { rageDays } = req.params;
  const result = await schedulesService.countSchedules(Number(rageDays));
  return res.status(200).json({ result });
};

export default { finaAllSchedulesDate, findByScheduleDateId, countSchedules };