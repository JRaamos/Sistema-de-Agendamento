import dayOffService from "../services/dayOff.service"; 
import {Request, Response} from 'express';

const createDayOff = async (req: Request, res: Response) => {
  const dayOff = req.body;
  const objDayOff = {
    barberId: 1,
    dayOff: dayOff.dayOff,
    time: dayOff.timeOffType,
  }
  const newDayOff = await dayOffService.createDayOff(objDayOff);
  res.status(201).json(newDayOff);
}

const getDayOffs = async (req: Request, res: Response) => {
  const dayOffs = await dayOffService.getDayOffs();
  res.status(200).json(dayOffs);
}

export default {
  createDayOff,
  getDayOffs,
};