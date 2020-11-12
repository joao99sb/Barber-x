import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import AppError from '@shared/errors/AppError';
import authConfig from '@config/auth';

interface ITokenPayload {
  id: string;
  iat: Date;
  exp: Date;
}

export default async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(400).json({ err: 'Token not provided' });
  }
  const [, token] = authHeader.split(' ');

  const encoded = jwt.verify(token, authConfig.secret, (err, data) => {
    if (err) {
      throw new AppError(err.message, 400);
    }

    return data;
  });
  const { id } = (encoded as unknown) as ITokenPayload;
  req.user = { id };

  return next();
};
