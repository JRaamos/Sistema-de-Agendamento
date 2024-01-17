import { Request, Response } from 'express';
import schedulesService from '../services/schedules.service';

const finaAllSchedulesDate = async (req: Request, res: Response) => {
  const { date } = req.params;
  const scheduleResult = await schedulesService.finaAllSchedulesDate(date);
  return res.status(200).json(scheduleResult);
};

const findByScheduleDateId = async (req: Request, res: Response) => {
  const { date, hour } = req.params;
  const scheduleResult = await schedulesService.findByScheduleDateId(date, hour);
  return res.status(200).json(scheduleResult);
};

const countSchedules = async (req: Request, res: Response) => {
  const { intervalDays } = req.params;

  const result = await schedulesService.countSchedules(Number(intervalDays));
  return res.status(200).json({ result });
};

const countFutureSchedules = async (req: Request, res: Response) => {
  const result = await schedulesService.countFutureSchedules();
  return res.status(200).json({ result });
};
const findAllSchedulesFromNow = async (req: Request, res: Response) => {
  const result = await schedulesService.findAllSchedulesFromNow();
  
  return res.status(200).json(result.data);
};

export default {
  finaAllSchedulesDate, 
  findByScheduleDateId,
  countSchedules,
  countFutureSchedules,
  findAllSchedulesFromNow, 
};