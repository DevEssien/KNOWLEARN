import { Router } from 'express';
import  UserController  from '../../controllers/user/index'

const router = Router();

const { getAllUser, getUserById, updateUser, deleteOneUser, test } = UserController;

router.route('/')
.get( getAllUser )
// .post( createUser )
.post(test)

router.route('/:userId')
.get( getUserById )
.put( updateUser )
.delete( deleteOneUser )

export default router;