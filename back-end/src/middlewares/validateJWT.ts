import { Request, Response, NextFunction } from 'express';
import jwt from '../utils/jwt.utils';

const validateJWT = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.includes('Bearer')) {
    return res.status(401).json({ message: 'Token not found' });
  }

  const token = authorization.split(' ')[1];

  try {
    const userCode = jwt.verifyToken(token);
    if (!userCode) {
      return res.status(401).json({
        message: 'Expired or invalid token',
      });
    }

    next();
  } catch (error) {
    return res.status(401).json({
      message: 'Expired or invalid token',
    });
  }
};

export default validateJWT;
