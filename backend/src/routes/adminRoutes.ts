import express from 'express';
import * as adminController from '../controllers/adminController';
import { protect, restrictTo } from '../middleware/authMiddleware';

const router = express.Router();

router.use(protect);
router.use(restrictTo('ADMIN'));

router.post('/create-expert', adminController.createExpert);
router.post('/verify-expert/:user_id', adminController.verifyExpert);

export default router;
