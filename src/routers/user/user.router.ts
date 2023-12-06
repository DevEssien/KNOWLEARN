import { Router } from 'express';
import  UserController  from '../../controllers/user/index'

const router = Router();

const { createUser, getAllUser, getUserById } = UserController;

router.route('/')
.get( getAllUser )
.post( createUser )

router.route('/:userId')
.get( getUserById )
// .put( updateUser )
// .delete( deleteOneUser )

export default router;