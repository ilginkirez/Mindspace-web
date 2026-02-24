import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/db';
import { sendSuccess } from '../utils/response';
import { AppError } from '../utils/AppError';

export const listExperts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const experts = await prisma.expertProfile.findMany({
            include: {
                user: {
                    select: { id: true, email: true }
                }
            }
        });

        sendSuccess(res, { experts });
    } catch (err) {
        next(err);
    }
};

export const getExpert = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const expert = await prisma.expertProfile.findUnique({
            where: { id: req.params.id },
        });

        if (!expert) {
            const expertByUser = await prisma.expertProfile.findUnique({ where: { user_id: req.params.id } });
            if (expertByUser) {
                return sendSuccess(res, { expert: expertByUser });
            }
            return next(new AppError('Expert not found', 404));
        }

        sendSuccess(res, { expert });
    } catch (err) {
        next(err);
    }
};
