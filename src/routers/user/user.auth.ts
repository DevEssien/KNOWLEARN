import { Router } from 'express';
import UserController from '../../controllers/user/index';

const { createUser, loginUser, verifyEmail } = UserController;

const router = Router();

router.post('/signup', createUser );

router.post('/login', loginUser );

router.put('/verify-email', verifyEmail)

export default router;