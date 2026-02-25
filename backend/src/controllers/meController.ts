import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/db';
import { AppError } from '../utils/AppError';
import { hashPassword, comparePassword } from '../utils/password';
import { sendSuccess } from '../utils/response';
import { z } from 'zod';

const updateProfileSchema = z.object({
    full_name: z.string().min(2).optional(),
    email: z.string().email().optional(),
});

const changePasswordSchema = z.object({
    current_password: z.string().min(1),
    new_password: z.string().min(6),
});

// GET /me/profile
export const getProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.user?.id },
            select: { id: true, email: true, full_name: true, role: true, created_at: true },
        });
        if (!user) return next(new AppError('User not found', 404));
        sendSuccess(res, { user });
    } catch (err) {
        next(err);
    }
};

// PATCH /me/profile
export const updateProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = updateProfileSchema.parse(req.body);

        if (data.email) {
            const existing = await prisma.user.findUnique({ where: { email: data.email } });
            if (existing && existing.id !== req.user?.id) {
                return next(new AppError('Bu e-posta adresi zaten kullanımda', 400));
            }
        }

        const user = await prisma.user.update({
            where: { id: req.user?.id },
            data,
            select: { id: true, email: true, full_name: true, role: true },
        });

        sendSuccess(res, { user });
    } catch (err) {
        next(err);
    }
};

// PATCH /me/change-password
export const changePassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { current_password, new_password } = changePasswordSchema.parse(req.body);

        const user = await prisma.user.findUnique({ where: { id: req.user?.id } });
        if (!user) return next(new AppError('User not found', 404));

        const isMatch = await comparePassword(current_password, user.password_hash);
        if (!isMatch) return next(new AppError('Mevcut şifre yanlış', 401));

        const hashed = await hashPassword(new_password);
        await prisma.user.update({
            where: { id: req.user?.id },
            data: { password_hash: hashed },
        });

        sendSuccess(res, { message: 'Şifre başarıyla güncellendi' });
    } catch (err) {
        next(err);
    }
};
