import { Request, Response, NextFunction } from 'express';

const servicePriceValidation = (req: Request, res: Response, next: NextFunction) => {
  const { price } = req.body;
  const { name } = req.params;
  console.log(name);
  
  if (!name) {
    return res.status(400).json({ message: 'Invalid name. Try again.' });
  }
  if (price <= 0 || !price) {
    return res.status(400).json({ message: 'Invalid price. Try again.' });
  }

  next();
};

export default servicePriceValidation;