import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { BadRequestError, UnauthorizedError } from '../middleware/errorHandler.js';

const loginSchema = z.object({
  password: z.string().min(1, 'Password is required'),
});

export const handleLogin = (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = loginSchema.safeParse(req.body);
    if (!result.success) {
      throw new BadRequestError('Password is required', result.error.flatten().fieldErrors);
    }

    const { password } = result.data;
    const adminPassword = process.env.ADMIN_PASSWORD || 'subhabrata_secure_admin_2026';

    if (password !== adminPassword) {
      throw new UnauthorizedError('Invalid administrative password.');
    }

    const secret = process.env.JWT_SECRET || 'super_secret_jwt_portfolio_key_998877665544';
    const token = jwt.sign(
      { role: 'admin', username: 'Subhabrata Dey' },
      secret,
      { expiresIn: '7d' }
    );

    return res.status(200).json({
      success: true,
      message: 'Authentication successful.',
      token,
      user: {
        name: 'Subhabrata Dey',
        role: 'admin',
      },
    });
  } catch (error) {
    next(error);
  }
};

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedError('Access denied. Valid Bearer authorization token required.');
    }

    const token = authHeader.split(' ')[1];
    const secret = process.env.JWT_SECRET || 'super_secret_jwt_portfolio_key_998877665544';

    const decoded = jwt.verify(token, secret);
    return res.status(200).json({ 
      success: true, 
      valid: true, 
      user: decoded 
    });
  } catch (error) {
    next(error);
  }
};
