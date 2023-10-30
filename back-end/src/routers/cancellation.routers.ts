import { Router } from 'express';
import cancellationController from '../controllers/cancellation.controller';

const routerCancellation = Router();

routerCancellation.post('/cancellation', cancellationController.createCancellation);

export default routerCancellation;