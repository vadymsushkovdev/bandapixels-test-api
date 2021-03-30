import { Router } from 'express';
import * as CurrencyComponent  from './.';
import * as jwtConfig from '../../config/guards/jwtAuth';
import exceptionsLatencyFilter from './validations/filter';

const router: Router = Router();

router.get('/latency', jwtConfig.isAuthenticated, exceptionsLatencyFilter(CurrencyComponent.latencyGoogle));

export default router;
