import { ErrorRequestHandler } from 'express';

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error('ERROR HANDLER', err);
  res.status(500).json({ error: 'Internal server error' });
};
