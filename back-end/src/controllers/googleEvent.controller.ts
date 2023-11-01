import { Request, Response } from 'express';
import googleEvent from '../services/googleEvent.service';
import transformToGoogleEvent from '../utils/formatGoogleEvent';

const createEvent = async (req: Request, res: Response) => {
  const transformsEvent = transformToGoogleEvent(req.body);
  const event = await googleEvent.createEventService(transformsEvent);
  return res.status(200).json({ message: 'Evento criado com sucesso!', event });
};

export default { createEvent };