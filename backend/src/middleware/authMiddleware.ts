import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';
import { prisma } from '../config/db';
import { AppError } from '../utils/AppError';
import { Role } from '@prisma/client';

export const protect = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return next(new AppError('You are not logged in due to missing token.', 401));
        }

        const decoded = verifyToken(token);

        // Check if user still exists
        const currentUser = await prisma.user.findUnique({ where: { id: decoded.id } });
        if (!currentUser) {
            return next(new AppError('The user belonging to this token no longer exists.', 401));
        }

        // Grant access
        req.user = { id: currentUser.id, role: currentUser.role };
        next();
    } catch (error) {
        return next(new AppError('Invalid token. Please log in again.', 401));
    }
};

export const restrictTo = (...roles: Role[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return next(new AppError('You do not have permission to perform this action', 403));
        }
        next();
    };
};
