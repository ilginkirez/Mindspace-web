import express from 'express';
import * as appointmentController from '../controllers/appointmentController';
import { protect, restrictTo } from '../middleware/authMiddleware';

const router = express.Router();

router.use(protect);

router.post('/', restrictTo('USER'), appointmentController.createAppointment);
// Note: /me/appointments is handled here? Or should be /appointments/me?
// Request said "GET /me/appointments". I will mount this on /appointments and use /me path?
// Or I'll mount generic "me" routes on a generic router? 
// Usually REST is /appointments?user_id=me or similar.
// But following spec:
router.get('/me', restrictTo('USER'), appointmentController.getMyAppointments);
router.get('/expert/me', restrictTo('EXPERT'), appointmentController.getExpertAppointments);
router.patch('/:id/cancel', appointmentController.cancelAppointment);
router.post('/:id/feedback', restrictTo('USER'), appointmentController.leaveFeedback);

export default router;
