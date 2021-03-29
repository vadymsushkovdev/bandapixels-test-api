import * as AuthComponent from './.';
import { Router } from 'express';
import exceptionsAuthFilter from './validations/filter';
import * as jwtConfig from '../../config/guards/jwtAuth';

const router: Router = Router();

router.post('/signup', exceptionsAuthFilter(AuthComponent.signup));

router.post('/login', exceptionsAuthFilter(AuthComponent.login));

router.get('/logout', jwtConfig.isAuthenticated, exceptionsAuthFilter(AuthComponent.logout));

export default router;
