import { signup, login, logout } from './index';
import { Router } from 'express';
import exceptionsAuthFilter from './validations/filter';
import jwtAuth from '@guards/jwtAuth';

const router: Router = Router();

router.post('/signup', exceptionsAuthFilter(signup));

router.post('/login', exceptionsAuthFilter(login));
// @ts-ignore
router.get('/logout', jwtAuth, exceptionsAuthFilter(logout));

export default router;
