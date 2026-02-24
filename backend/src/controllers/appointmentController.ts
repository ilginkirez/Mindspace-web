import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/db';
import { AppError } from '../utils/AppError';
import { sendSuccess } from '../utils/response';
import { z } from 'zod';

const createAppointmentSchema = z.object({
    expert_id: z.string(),
    datetime: z.string().datetime(),
    type: z.enum(['ONLINE', 'IN_PERSON']),
});

export const createAppointment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { expert_id, datetime, type } = createAppointmentSchema.parse(req.body);

        const expertUser = await prisma.user.findUnique({ where: { id: expert_id }, include: { expert_profile: true } });
        if (!expertUser || expertUser.role !== 'EXPERT') {
            return next(new AppError('Invalid expert ID', 400));
        }

        const appointment = await prisma.appointment.create({
            data: {
                user_id: req.user!.id,
                expert_id,
                datetime: new Date(datetime),
                type,
                status: 'SCHEDULED',
            },
        });

        sendSuccess(res, { appointment }, 201);
    } catch (err) {
        next(err);
    }
};

const enrichAppointment = (appt: any, role: 'USER' | 'EXPERT') => {
    const now = new Date();
    const apptTime = new Date(appt.datetime);
    const isPast = now > apptTime;
    const isCancelled = appt.status === 'CANCELLED';

    // 24h feedback window: Starts after appt, ends 24h later
    const feedbackWindowEnd = new Date(apptTime.getTime() + 24 * 60 * 60 * 1000);
    const hasFeedback = !!appt.feedback;
    const canFeedback = role === 'USER' && isPast && now < feedbackWindowEnd && !isCancelled && !hasFeedback;

    const canCancel = !isPast && !isCancelled;

    return {
        ...appt,
        is_past: isPast,
        can_cancel: canCancel,
        can_feedback: canFeedback
    };
};

export const getMyAppointments = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const appointments = await prisma.appointment.findMany({
            where: { user_id: req.user!.id },
            include: { expert: { select: { email: true, expert_profile: { select: { full_name: true, title: true } } } }, feedback: true },
            orderBy: { datetime: 'desc' }
        });

        const enriched = appointments.map(appt => enrichAppointment(appt, 'USER'));

        sendSuccess(res, { appointments: enriched });
    } catch (err) {
        next(err);
    }
};

export const getExpertAppointments = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (req.user!.role !== 'EXPERT') {
            return next(new AppError('Method only for experts', 403));
        }

        const appointments = await prisma.appointment.findMany({
            where: { expert_id: req.user!.id },
            include: { user: { select: { id: true, email: true } } },
            orderBy: { datetime: 'desc' }
        });

        const enriched = appointments.map(appt => enrichAppointment(appt, 'EXPERT'));

        sendSuccess(res, { appointments: enriched });
    } catch (err) {
        next(err);
    }
};

export const cancelAppointment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const appointment = await prisma.appointment.findUnique({ where: { id: req.params.id } });

        if (!appointment) {
            return next(new AppError('Appointment not found', 404));
        }

        if (appointment.user_id !== req.user!.id && appointment.expert_id !== req.user!.id) {
            return next(new AppError('Not authorized to cancel this appointment', 403));
        }

        const updated = await prisma.appointment.update({
            where: { id: req.params.id },
            data: { status: 'CANCELLED' },
        });

        sendSuccess(res, { appointment: updated });
    } catch (err) {
        next(err);
    }
};

const feedbackSchema = z.object({
    rating: z.enum(['POSITIVE', 'NEUTRAL', 'DIFFICULT']),
    comment: z.string().optional(),
});

export const leaveFeedback = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { rating, comment } = feedbackSchema.parse(req.body);
        const appointmentId = req.params.id;

        const appointment = await prisma.appointment.findUnique({
            where: { id: appointmentId }
        });

        if (!appointment) {
            return next(new AppError('Appointment not found', 404));
        }

        if (appointment.user_id !== req.user!.id) {
            return next(new AppError('You can only leave feedback for your own appointments', 403));
        }

        const now = new Date();
        const apptTime = new Date(appointment.datetime);
        const limit = new Date(apptTime.getTime() + 24 * 60 * 60 * 1000);

        if (now < apptTime) {
            return next(new AppError('Cannot leave feedback before appointment starts', 400));
        }
        if (now > limit) {
            return next(new AppError('Feedback window has closed (24h limit)', 400));
        }

        const existing = await prisma.sessionFeedback.findUnique({ where: { appointment_id: appointmentId } });
        if (existing) {
            return next(new AppError('Feedback already submitted', 400));
        }

        const feedback = await prisma.sessionFeedback.create({
            data: {
                user_id: req.user!.id,
                appointment_id: appointmentId,
                rating,
                comment,
            }
        });

        sendSuccess(res, { feedback }, 201);

    } catch (err) {
        next(err);
    }
}
