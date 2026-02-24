import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/db';
import { AppError } from '../utils/AppError';
import { sendSuccess } from '../utils/response';
import { z } from 'zod';

const createPostSchema = z.object({
    title: z.string().min(1),
    content: z.string().min(1),
    category: z.string(),
});

export const getAllBlogs = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?.id;
        const posts = await prisma.blogPost.findMany({
            where: { status: 'PUBLISHED' },
            include: {
                author: { select: { email: true, expert_profile: { select: { full_name: true, title: true } } } },
                ...(userId ? { saved_by: { where: { user_id: userId } } } : {})
            },
            orderBy: { created_at: 'desc' }
        });

        const mappedPosts = posts.map(post => ({
            id: post.id,
            title: post.title,
            category: post.category,
            author: post.author.expert_profile ?? { full_name: 'Unknown', title: 'Expert' },
            createdAt: post.created_at,
            is_saved: userId ? (post.saved_by && post.saved_by.length > 0) : false
        }));

        sendSuccess(res, { posts: mappedPosts });
    } catch (err) {
        next(err);
    }
};

export const getBlog = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?.id;
        const post = await prisma.blogPost.findUnique({
            where: { id: req.params.id },
            include: {
                author: { select: { email: true, expert_profile: { select: { full_name: true, title: true, bio: true } } } },
                ...(userId ? { saved_by: { where: { user_id: userId } } } : {})
            },
        });

        if (!post) {
            return next(new AppError('No blog found with that ID', 404));
        }

        const mappedPost = {
            ...post,
            author: post.author.expert_profile,
            is_saved: userId ? (post.saved_by && post.saved_by.length > 0) : false,
            saved_by: undefined
        };

        sendSuccess(res, { post: mappedPost });
    } catch (err) {
        next(err);
    }
};

export const createBlog = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { title, content, category } = createPostSchema.parse(req.body);
        const userId = req.user!.id;

        if (req.user!.role === 'EXPERT') {
            const expert = await prisma.expertProfile.findUnique({ where: { user_id: userId } });
            // Unverified experts can create drafts but cannot publish. 
            // This controller currently defaults to DRAFT so it is safe.
        }

        const newPost = await prisma.blogPost.create({
            data: {
                title,
                content,
                category,
                author_id: userId,
                status: 'DRAFT',
            },
        });

        sendSuccess(res, { post: newPost }, 201);
    } catch (err) {
        next(err);
    }
};

export const updateBlog = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const post = await prisma.blogPost.findUnique({ where: { id: req.params.id } });

        if (!post) {
            return next(new AppError('No blog found with that ID', 404));
        }

        if (post.author_id !== req.user!.id && req.user!.role !== 'ADMIN') {
            return next(new AppError('You are not authorized to edit this post', 403));
        }

        if (req.body.status === 'PUBLISHED' && req.user!.role === 'EXPERT') {
            const expert = await prisma.expertProfile.findUnique({ where: { user_id: req.user!.id } });
            if (!expert || !expert.is_verified) {
                return next(new AppError('You must be a verified expert to publish posts.', 403));
            }
        }

        const updatedPost = await prisma.blogPost.update({
            where: { id: req.params.id },
            data: req.body,
        });

        sendSuccess(res, { post: updatedPost });
    } catch (err) {
        next(err);
    }
};

export const deleteBlog = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await prisma.blogPost.delete({ where: { id: req.params.id } });
        sendSuccess(res, null, 200);
    } catch (err) {
        next(err);
    }
};
