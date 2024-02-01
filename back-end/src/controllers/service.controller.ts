import { Request, Response } from 'express';
import serviceService from '../services/service.service';
import mapStatusHTTP from '../utils/mapStatusHTTP';

const getAllService = async (req: Request, res: Response) => {
  const { data, status } = await serviceService.getAllService();
  return res.status(mapStatusHTTP(status)).json(data);
};

const UpdatePriceServiceByName = async (req: Request, res: Response) => {
  const { name } = req.params;
  const formatName = name.split('-').join(' ');
  const { data, status } = await serviceService.UpdatePriceServiceByName(formatName, req.body);
  return res.status(mapStatusHTTP(status)).json(data);
};
export default { getAllService, UpdatePriceServiceByName };