import { Request, Response } from 'express';
import googleEvent from '../services/googleEvent.service';
import transformToGoogleEvent from '../utils/formatGoogleEvent';

const createEvent = async (req: Request, res: Response) => {
  const transformsEvent = await transformToGoogleEvent(req.body);
  const event = await googleEvent.createEventService(transformsEvent);
  return res.status(200).json({ message: 'Evento criado com sucesso!', event });
};

const deleteEvent = async (req: Request, res: Response) => {
  const { eventId } = req.params;
  const event = await googleEvent.deleteEventService(eventId);
  return res.status(200).json({ message: 'Evento deletado com sucesso!', event });
};

export default { createEvent, deleteEvent };