import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/db';
import { hashPassword } from '../utils/password';
import { AppError } from '../utils/AppError';
import { sendSuccess } from '../utils/response';
import { z } from 'zod';

const createExpertSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    full_name: z.string(),
    title: z.string(),
    bio: z.string(),
    specialties: z.string(),
});

export const createExpert = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password, full_name, title, bio, specialties } = createExpertSchema.parse(req.body);

        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return next(new AppError('Email already in use', 400));
        }

        const hashedPassword = await hashPassword(password);

        const newUser = await prisma.$transaction(async (tx) => {
            const user = await tx.user.create({
                data: {
                    email,
                    password_hash: hashedPassword,
                    role: 'EXPERT',
                },
            });

            await tx.expertProfile.create({
                data: {
                    user_id: user.id,
                    full_name,
                    title,
                    bio,
                    specialties,
                    is_verified: false
                }
            });
            return user;
        });

        sendSuccess(res, { user_id: newUser.id }, 201);
    } catch (err) {
        next(err);
    }
};

export const verifyExpert = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { user_id } = req.params;

        const profile = await prisma.expertProfile.findUnique({ where: { user_id } });
        if (!profile) {
            return next(new AppError('Expert profile not found', 404));
        }

        const updated = await prisma.expertProfile.update({
            where: { user_id },
            data: { is_verified: true }
        });

        sendSuccess(res, { expert_profile: updated });
    } catch (err) {
        next(err);
    }
};
