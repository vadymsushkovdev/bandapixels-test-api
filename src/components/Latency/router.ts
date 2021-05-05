import { Router } from 'express';
import { latencyGoogle } from './index';
import jwtAuth from '@guards/jwtAuth';
import exceptionsLatencyFilter from './validations/filter';

const router: Router = Router();
// @ts-ignore
router.get('/latency', jwtAuth, exceptionsLatencyFilter(latencyGoogle));

export default router;
