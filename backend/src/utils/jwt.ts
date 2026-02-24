import jwt from 'jsonwebtoken';
import { env } from '../config/env';

export const signToken = (id: string, role: string) => {
    return jwt.sign({ id, role }, env.JWT_SECRET, {
        expiresIn: '90d',
    });
};

export const verifyToken = (token: string) => {
    return jwt.verify(token, env.JWT_SECRET) as { id: string; role: string };
};
