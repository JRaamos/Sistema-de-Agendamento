import { Request, Response } from 'express';
import serviceService from '../services/service.service';
import mapStatusHTTP from '../utils/mapStatusHTTP';

const findBybServiceName = async (req: Request, res: Response) => {
  const { service } = req.params;
  const { data, status } = await serviceService.findByNameService(service);
  return res.status(mapStatusHTTP(status)).json(data);
};

const updateServiceByName = async (req: Request, res: Response) => {
  const { name } = req.params;
  const { newService } = req.body;
  const { data, status } = await serviceService.updateServiceByName(name, newService);
  return res.status(mapStatusHTTP(status)).json(data);
};
export default { findBybServiceName, updateServiceByName };