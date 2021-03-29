import { Router } from 'express';
import * as CurrencyComponent  from './.';
import * as jwtConfig from '../../config/guards/jwtAuth';
import exceptionsPingerFilter from './validations/filter';

const router: Router = Router();

router.get('/ping', jwtConfig.isAuthenticated, exceptionsPingerFilter(CurrencyComponent.pingGoogle));

export default router;
