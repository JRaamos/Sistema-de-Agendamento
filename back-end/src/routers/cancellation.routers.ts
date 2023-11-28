import { Router } from 'express';
import cancellationController from '../controllers/cancellation.controller';
import validateJWT from '../middlewares/validateJWT';

const routerCancellation = Router();

routerCancellation.post(
  '/cancellation',
  cancellationController.createCancellation,
);

routerCancellation.get(
  '/cancellation/date/:date',
  cancellationController.getByCancellationDate,
);
routerCancellation.get(
  '/cancellation/count/:intervalDays',
  validateJWT,
  cancellationController.countCancellation,
);

export default routerCancellation;
