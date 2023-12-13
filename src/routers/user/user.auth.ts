import { Router } from 'express';
import UserController from '../../controllers/user/index';

const { createUser, loginUser } = UserController;

const router = Router();

router.post('/signup', createUser );

router.post('/login', loginUser );

export default router;