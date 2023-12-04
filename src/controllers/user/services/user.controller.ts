// import { TServiceSuccessResponse, ResponseStatus } from '../../../types';
import { Request } from "express";
import { wrapHandler } from '../../index';
import UserService from "./user.service";



export default class UserController {
    public static getAllUser = wrapHandler(() => {
        return UserService.getAllUser()
    });

    // public static getUserById = wrapHandler((req: Request) => {
    //     return UserService.getUserById(req.params?.userId);
    // });

    public static createUser = wrapHandler((req: Request) => {
        return UserService.createUser({ ...req.body});
    });

    // public static updateUser = wrapHandler((req: Request) => {
    //     return UserService.updateUser( {...req.params}, { ...req.body } );
    // });

    // public static deleteOneUser = wrapHandler((req: Request ) => {
    //     return UserService.deleteUserById({ ...req.params });
    // })
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