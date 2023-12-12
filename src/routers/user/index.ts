import { Router } from 'express';
import userRouter from './user.actions';
import userAuthRouter from './user.auth';

const router = Router();

router.use('/users', userRouter);

router.use('/users/auth', userAuthRouter);

export default router;