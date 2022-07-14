import { Request, Response, NextFunction } from 'express';

export const logger = (_: Request, __: Response, next: NextFunction) => {
  console.log('Request...');
  next();
};
