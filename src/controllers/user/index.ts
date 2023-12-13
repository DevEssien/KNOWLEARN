import { Request } from "express";
import { wrapHandler } from '../../utils/serviceWrapper';
import UserService from "./services/user.service";
import UserSignup from '../auth/services/signup';
import UserLogin from '../auth/services/login';


export default class UserController {
    public static getAllUser = wrapHandler(() => {
        return UserService.getAllUser()
    });

    public static getUserById = wrapHandler((req: Request) => {
        return UserService.getUserById({ _id: req.params?.userId});
    });

    public static loginUser = wrapHandler((req: Request) => {
        return UserLogin({ ...req.body });
    });
    
    public static createUser = wrapHandler((req: Request) => {
        return UserSignup({ ...req.body});
    });
 
    public static updateUser = wrapHandler((req: Request) => {
        const _id = req.params?.userId
        return UserService.updateUser( { _id }, { ...req.body } );
    });

    public static deleteOneUser = wrapHandler((req: Request ) => {
        const _id = req.params?.userId;
        return UserService.deleteUserById({ _id });
    })
}
