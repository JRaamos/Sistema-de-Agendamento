import { Router } from 'express';
import googleEventController from '../controllers/googleEvent.controller';

const routerGoogleEvent = Router();

routerGoogleEvent.post('/googleEvent', googleEventController.createEvent);

export default routerGoogleEvent;