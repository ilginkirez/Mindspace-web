import express from 'express';
import * as appointmentController from '../controllers/appointmentController';
import { protect, restrictTo } from '../middleware/authMiddleware';

const router = express.Router();

router.use(protect);
router.use(restrictTo('EXPERT'));

router.get('/me/appointments', appointmentController.getExpertAppointments);

export default router;
