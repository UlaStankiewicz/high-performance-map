import express from 'express';

import { getPoints } from '../controllers';
const router = express.Router();

// router.post('/addPoint', addPoint);
router.get('/getAllPoints', getPoints);
// router.get('/:pointID', getPointById);

export default router;
