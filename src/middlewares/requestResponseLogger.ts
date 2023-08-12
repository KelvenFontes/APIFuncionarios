// requestResponseLogger.ts
import { Request, Response, NextFunction } from 'express';

export const requestResponseLogger = (req: Request, res: Response, next: NextFunction) => {
  const startTime = new Date().getTime();

  res.on('finish', () => {
    const endTime = new Date().getTime();
    const responseTime = endTime - startTime;
    console.log(
      `[${new Date().toISOString()}] ${req.method} ${req.url} - Status: ${res.statusCode} - Time: ${responseTime}ms`
    );
  });

  next();
};
