import { Request, Response, NextFunction } from 'express';

// Middleware para tratar erros globalmente
export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
};
