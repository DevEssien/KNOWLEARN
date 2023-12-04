import { Router } from 'express';
import  UserController  from '../../controllers/user/services/user.controller';

const router = Router();

const { createUser, getUserById, getAllUser, deleteOneUser, updateUser } = UserController;

router.route('/')
.get( getAllUser )
.post( createUser )

router.route('/:userId')
.get( getUserById )
.put( updateUser )
.delete( deleteOneUser )

export default router;