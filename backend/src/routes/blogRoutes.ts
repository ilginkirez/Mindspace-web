import express from 'express';
import * as blogController from '../controllers/blogController';
import { protect, restrictTo } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/', blogController.getAllBlogs);
router.get('/:id', blogController.getBlog);

router.use(protect);

router.post('/', restrictTo('EXPERT', 'ADMIN'), blogController.createBlog);
router.put('/:id', restrictTo('EXPERT', 'ADMIN'), blogController.updateBlog);
router.delete('/:id', restrictTo('ADMIN'), blogController.deleteBlog);

export default router;
