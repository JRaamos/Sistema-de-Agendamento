import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET as string;

type TokekPayload = {
  email: string;
  password: string;
};

const generetToken = (payload: TokekPayload): string => {
  const token = jwt.sign(payload, secret);
  return token;
};

const verifyToken = (token: string): TokekPayload => {
  const data = jwt.verify(token, secret) as TokekPayload;
  return data;
};
export default {
  generetToken,
  verifyToken,
};