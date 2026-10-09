import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

export class AppError extends Error {
  public statusCode: number;
  public errorCode: string;
  public details?: any;

  constructor(message: string, statusCode = 500, errorCode = 'INTERNAL_ERROR', details?: any) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.details = details;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class BadRequestError extends AppError {
  constructor(message = 'Bad Request', details?: any) {
    super(message, 400, 'BAD_REQUEST', details);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = 'Unauthorized access', details?: any) {
    super(message, 401, 'UNAUTHORIZED', details);
  }
}

export class ForbiddenError extends AppError {
  constructor(message = 'Forbidden action', details?: any) {
    super(message, 403, 'FORBIDDEN', details);
  }
}

export class NotFoundError extends AppError {
  constructor(message = 'Resource not found', details?: any) {
    super(message, 404, 'NOT_FOUND', details);
  }
}

export class ConflictError extends AppError {
  constructor(message = 'Resource conflict', details?: any) {
    super(message, 409, 'CONFLICT', details);
  }
}

export class TooManyRequestsError extends AppError {
  constructor(message = 'Too many requests. Please try again later.', details?: any) {
    super(message, 429, 'RATE_LIMIT_EXCEEDED', details);
  }
}

/**
 * 404 handler for unknown routes
 */
export function notFoundHandler(req: Request, _res: Response, next: NextFunction) {
  next(new NotFoundError(`Route ${req.method} ${req.originalUrl} not found`));
}

/**
 * Centralized express error handler
 */
export function errorHandler(err: any, _req: Request, res: Response, _next: NextFunction) {
  // If headers already sent, delegate to standard Express handler
  if (res.headersSent) {
    return _next(err);
  }

  // Handle AppError
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      error: {
        code: err.errorCode,
        message: err.message,
        details: err.details,
      },
    });
  }

  // Handle Zod Validation Error
  if (err instanceof ZodError) {
    const flattened = err.flatten();
    return res.status(400).json({
      success: false,
      message: 'Validation failed for request input',
      errors: flattened.fieldErrors,
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Invalid request payload',
        details: flattened.fieldErrors,
      },
    });
  }

  // Handle Malformed JSON payload
  if (err instanceof SyntaxError && 'status' in err && (err as any).status === 400 && 'body' in err) {
    return res.status(400).json({
      success: false,
      message: 'Malformed JSON payload in request body',
      error: {
        code: 'MALFORMED_JSON',
        message: 'Request body contains invalid JSON syntax',
      },
    });
  }

  // Handle Prisma Known Request Errors
  if (err.code && typeof err.code === 'string' && err.code.startsWith('P')) {
    if (err.code === 'P2002') {
      const target = Array.isArray(err.meta?.target) ? err.meta.target.join(', ') : 'field';
      return res.status(409).json({
        success: false,
        message: `Unique constraint failed on ${target}`,
        error: {
          code: 'DUPLICATE_RESOURCE',
          message: `A record with this ${target} already exists`,
        },
      });
    }

    if (err.code === 'P2025') {
      return res.status(404).json({
        success: false,
        message: 'Record not found in database',
        error: {
          code: 'RECORD_NOT_FOUND',
          message: 'The requested database record does not exist',
        },
      });
    }
  }

  // Handle JWT Errors
  if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired authorization token',
      error: {
        code: 'INVALID_TOKEN',
        message: err.message,
      },
    });
  }

  // Default to 500 Internal Server Error
  const isDev = process.env.NODE_ENV !== 'production';
  console.error('Unhandled Application Error:', err);

  return res.status(500).json({
    success: false,
    message: isDev ? err.message : 'An internal server error occurred.',
    error: {
      code: 'INTERNAL_SERVER_ERROR',
      message: isDev ? err.message : 'An unexpected internal server error occurred.',
      ...(isDev && { stack: err.stack }),
    },
  });
}
