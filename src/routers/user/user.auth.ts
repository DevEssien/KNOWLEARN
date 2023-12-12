import { Router } from 'express';
import UserController from '../../controllers/user/index';

const { createUser } = UserController;

const router = Router();

router.post('/signup', createUser );

export default router;