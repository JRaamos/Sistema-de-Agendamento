import { Request, Response, NextFunction } from 'express';

const validateUser = (req: Request, res: Response, next: NextFunction) => {
  const { name, phone } = req.body;

  if (!name || !phone) {
    return res.status(300).json({ message: 'Invalid name or phone. Try again.' });
  }

  next();
};

const validateService = (req: Request, res: Response, next: NextFunction) => {
  const { services } = req.body;

  if (!services) {
    return res.status(300).json({ message: 'Invalid services. Try again.' });
  }

  next();
};

const validadeSchedule = (req: Request, res: Response, next: NextFunction) => {
  const { date, hour } = req.body;

  if (!date || !hour) {
    return res.status(300).json({ message: 'Invalid date or hour. Try again.' });
  }

  next();
};

export default { validateUser, validateService, validadeSchedule };