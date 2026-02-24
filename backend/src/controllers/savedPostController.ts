import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/db';
import { sendSuccess } from '../utils/response';
import { AppError } from '../utils/AppError';

export const getSavedPosts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const saved = await prisma.savedPost.findMany({
            where: { user_id: req.user!.id },
            include: {
                post: {
                    include: {
                        author: { select: { expert_profile: true } }
                    }
                }
            },
        });

        const mapped = saved.map(s => ({
            id: s.id,
            post: {
                ...s.post,
                author: s.post.author.expert_profile ?? { full_name: 'Unknown', title: 'Expert' },
                is_saved: true // implicitly true since it is in saved list
            }
        }));

        sendSuccess(res, { saved_posts: mapped });
    } catch (err) {
        next(err);
    }
};

export const savePost = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { post_id } = req.body;

        const existing = await prisma.savedPost.findUnique({
            where: {
                user_id_post_id: {
                    user_id: req.user!.id,
                    post_id,
                },
            },
        });

        if (existing) {
            return next(new AppError('Post already saved', 400));
        }

        const saved = await prisma.savedPost.create({
            data: {
                user_id: req.user!.id,
                post_id,
            },
        });

        sendSuccess(res, { saved }, 201);
    } catch (err) {
        next(err);
    }
};

export const unsavePost = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { post_id } = req.params;
        await prisma.savedPost.delete({
            where: {
                user_id_post_id: {
                    user_id: req.user!.id,
                    post_id: post_id,
                },
            },
        });

        sendSuccess(res, null, 200);
    } catch (err) {
        next(err);
    }
};
