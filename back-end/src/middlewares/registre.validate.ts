import { Request, Response, NextFunction } from 'express';

const message = 'Invalid entries. Try again.';

const validateUser = (req: Request, res: Response, next: NextFunction) => {
  const { name, phone } = req.body;

  if (!name || !phone) {
    return res.status(400).json({ message });
  }

  next();
};

const validateService = (req: Request, res: Response, next: NextFunction) => {
  const { services, price } = req.body;

  if (!services || !price) {
    return res.status(400).json({ message });
  }

  next();
};

const validadeSchedule = (req: Request, res: Response, next: NextFunction) => {
  const { date, hour } = req.body;

  if (!date || !hour) {
    return res.status(400).json({ message });
  }

  next();
};

export default { validateUser, validateService, validadeSchedule };