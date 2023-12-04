// import { TServiceSuccessResponse, ResponseStatus } from '../../../types';
import { Request } from "express";
import UserRepo from '../../../db/repositories/user.repo';
import UserModel from '../../../db/models/User';
import { wrapHandler } from '../../index';

const User = new UserRepo(UserModel)


export default class UserController {
    public static getAllUser = wrapHandler(() => {
        return User.getAllUser();
    });

    public static getUserById = wrapHandler((req: Request) => {
        return User.getUserById(req.params?.userId);
    });

    public static createUser = wrapHandler((req: Request) => {
        return User.createUser({ ...req.body});
    });

    public static updateUser = wrapHandler((req: Request) => {
        return User.updateUser( {...req.params}, { ...req.body } );
    });

    public static deleteOneUser = wrapHandler((req: Request ) => {
        return User.deleteUserById({ ...req.params });
    })
}




// export const createUser: RequestHandler = async (req, res, next): Promise<any> => {
//     try {
//         const { email, password } = req.body;
        
//         const user = await User.createUser(email, password);
//         if (!user) throw new Error('Unable  to create user'); 

//         const resData: TServiceSuccessResponse = {
//             status: ResponseStatus.SUCCESS,
//             message: 'created a user',
//             data: { user: user } 
//         }
//         return res.status(201).json(resData);
//     } catch (error) {
//         next(error);
//     }
// }