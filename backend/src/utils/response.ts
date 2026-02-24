import { Response } from 'express';

type ErrorCode = 'FORBIDDEN' | 'UNAUTHORIZED' | 'VALIDATION_ERROR' | 'NOT_FOUND' | 'INTERNAL_ERROR' | 'BAD_REQUEST';

export const sendSuccess = (res: Response, data: any, statusCode = 200) => {
    res.status(statusCode).json({
        success: true,
        data,
        error: null,
    });
};

export const sendError = (res: Response, code: ErrorCode, message: string, statusCode = 500) => {
    res.status(statusCode).json({
        success: false,
        data: null,
        error: {
            code,
            message,
        },
    });
};
