import { Router } from 'express';
import { info } from './index';
import jwtAuth from '@guards/jwtAuth';

const router: Router = Router();


router.get('/info', jwtAuth, info);

export default router;
