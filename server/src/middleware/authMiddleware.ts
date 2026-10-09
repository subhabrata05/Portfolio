import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UnauthorizedError, ForbiddenError } from './errorHandler.js';

export interface AuthenticatedRequest extends Request {
  user?: {
    role: string;
    username: string;
  };
}

export const requireAdmin = (req: AuthenticatedRequest, _res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new UnauthorizedError('Access denied. Valid Bearer authorization token required.'));
  }

  const token = authHeader.split(' ')[1];
  const secret = process.env.JWT_SECRET || 'super_secret_jwt_portfolio_key_998877665544';

  try {
    const decoded = jwt.verify(token, secret) as { role: string; username: string };
    if (decoded.role !== 'admin') {
      return next(new ForbiddenError('Forbidden. Administrative authorization required.'));
    }
    req.user = decoded;
    return next();
  } catch (_err) {
    return next(new UnauthorizedError('Invalid or expired authorization token.'));
  }
};
