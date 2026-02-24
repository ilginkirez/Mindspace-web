import express from 'express';
import * as expertController from '../controllers/expertController';

const router = express.Router();

router.get('/', expertController.listExperts);
router.get('/:id', expertController.getExpert);

export default router;
