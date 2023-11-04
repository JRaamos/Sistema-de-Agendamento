import dayOffService from "../services/dayOff.service";
import { Request, Response } from 'express';

const createDayOff = async (req: Request, res: Response) => {
  const dayOff = req.body;
console.log(dayOff);

    await dayOffService.createDayOff(dayOff);
  res.status(201).json('DayOff created');
}

const getDayOffs = async (req: Request, res: Response) => {
  const dayOffs = await dayOffService.getDayOffs();
  res.status(200).json(dayOffs);
}

export default {
  createDayOff,
  getDayOffs,
};