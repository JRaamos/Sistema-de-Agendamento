import { Request, Response } from 'express';
import schedulesService from '../services/schedules.service';

const finaAllSchedulesDate = async (req: Request, res: Response) => {
  const { date } = req.body;
  const scheduleResult = await schedulesService.finaAllSchedulesDate(date);
  return res.status(200).json(scheduleResult);
};

export default { finaAllSchedulesDate };