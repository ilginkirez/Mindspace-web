import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError';
import { sendError } from '../utils/response';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    let errorCode: any = 'INTERNAL_ERROR';
    if (err.statusCode === 400) errorCode = 'BAD_REQUEST';
    if (err.statusCode === 401) errorCode = 'UNAUTHORIZED';
    if (err.statusCode === 403) errorCode = 'FORBIDDEN';
    if (err.statusCode === 404) errorCode = 'NOT_FOUND';

    if (err.name === 'ZodError') {
        errorCode = 'VALIDATION_ERROR';
        err.statusCode = 400;
        const issues = err.issues.map((i: any) => `${i.path.join('.')}: ${i.message}`).join(', ');
        return sendError(res, errorCode, `Validation Error: ${issues}`, 400);
    }

    if (process.env.NODE_ENV === 'development') {
        // In dev, send error message directly
        return sendError(res, errorCode, err.message, err.statusCode);
    } else {
        // Production
        if (err.isOperational) {
            return sendError(res, errorCode, err.message, err.statusCode);
        } else {
            console.error('ERROR 💥', err);
            return sendError(res, 'INTERNAL_ERROR', 'Something went very wrong!', 500);
        }
    }
};
