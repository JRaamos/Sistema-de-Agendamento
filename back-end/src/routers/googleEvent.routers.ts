import { Router } from 'express';
import googleEventController from '../controllers/googleEvent.controller';

const routerGoogleEvent = Router();

routerGoogleEvent.post('/googleEvent', googleEventController.createEvent);
routerGoogleEvent.delete('/googleEvent/:eventId', googleEventController.deleteEvent);

export default routerGoogleEvent;