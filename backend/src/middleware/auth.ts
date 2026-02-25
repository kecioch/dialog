import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.sendStatus(401);

    const payload = verifyToken(token);
    req.user = payload;
    next();
  } catch {
    return res.sendStatus(401);
  }
};
