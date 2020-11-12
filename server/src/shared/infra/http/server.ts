/* eslint-disable @typescript-eslint/no-unused-vars */
import 'reflect-metadata';

import express, { Request, Response, NextFunction } from 'express';

import '@shared/infra/typeorm';
import '@shared/container';
import AppError from '@shared/errors/AppError';
import routes from './routes';

const app = express();
app.use(express.json());
app.use(routes);

// eslint-disable-next-line no-unused-vars
app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  // eslint-disable-next-line no-console
  console.log(err);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});
const port = 3333;
app.listen(port, () => console.log(`listen on ${port}`)); // eslint-disable-line
