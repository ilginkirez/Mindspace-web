import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/db';
import { AppError } from '../utils/AppError';
import { hashPassword, comparePassword } from '../utils/password';
import { signToken } from '../utils/jwt';
import { sendSuccess } from '../utils/response';
import { z } from 'zod';

const registerSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    full_name: z.string().optional(),
});

export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password, full_name } = registerSchema.parse(req.body);

        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return next(new AppError('Email already in use', 400));
        }

        const hashedPassword = await hashPassword(password);

        const user = await prisma.user.create({
            data: {
                email,
                password_hash: hashedPassword,
                role: 'USER', // Default role
                full_name: full_name || null,
            },
        });

        const token = signToken(user.id, user.role);

        sendSuccess(res, {
            token,
            user: { id: user.id, email: user.email, role: user.role, full_name: user.full_name }
        }, 201);
    } catch (err: any) {
        next(err);
    }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return next(new AppError('Please provide email and password', 400));
        }

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user || !(await comparePassword(password, user.password_hash))) {
            return next(new AppError('Incorrect email or password', 401));
        }

        const token = signToken(user.id, user.role);

        sendSuccess(res, {
            token,
            user: { id: user.id, email: user.email, role: user.role, full_name: user.full_name }
        });
    } catch (err) {
        next(err);
    }
};

export const getMe = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.user?.id },
            include: { expert_profile: true },
        });

        if (!user) {
            return next(new AppError('User not found', 404));
        }

        sendSuccess(res, {
            user: {
                id: user.id,
                email: user.email,
                role: user.role,
                full_name: user.full_name,
                created_at: user.created_at,
                expert_profile: user.expert_profile,
            },
        });
    } catch (err) {
        next(err);
    }
};
