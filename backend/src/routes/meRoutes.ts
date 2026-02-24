import express from 'express';
import * as savedPostController from '../controllers/savedPostController';
import * as appointmentController from '../controllers/appointmentController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.use(protect);

// Saved Posts
router.get('/saved-posts', savedPostController.getSavedPosts);
router.post('/saved-posts', savedPostController.savePost);
router.delete('/saved-posts/:post_id', savedPostController.unsavePost);

// My Appointments
router.get('/appointments', appointmentController.getMyAppointments);

export default router;
