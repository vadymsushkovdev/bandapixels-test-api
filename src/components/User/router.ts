import { Router } from 'express';
import * as UserComponent from './.';
import * as jwtConfig from '../../config/guards/jwtAuth';

const router: Router = Router();

router.get('/info', jwtConfig.isAuthenticated, UserComponent.info);

export default router;
