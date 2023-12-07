import { Request, Response } from 'express';
import dayOffService from '../services/dayOff.service';

const createDayOff = async (req: Request, res: Response) => {
  const dayOff = req.body;
  console.log(dayOff);

  await dayOffService.createDayOff(dayOff);
  res.status(201).json({ message: 'Folga Criada com Sucesso' });
};

const getDayOffs = async (req: Request, res: Response) => {
  const dayOffs = await dayOffService.getDayOffs();
  res.status(200).json(dayOffs);
};

const deleteDayOff = async (req: Request, res: Response) => {
  const { date } = req.params;
  await dayOffService.deleteDayOff(date);
  res.status(200).json({ message: 'Folga deletada com Sucesso' });
};

export default {
  createDayOff,
  getDayOffs,
  deleteDayOff,
};