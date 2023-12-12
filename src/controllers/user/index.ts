import { Request } from "express";
import { wrapHandler } from '../../utils/serviceWrapper';
import UserService from "./services/user.service";
import UserSignup from '../auth/services/signup';


export default class UserController {
    public static getAllUser = wrapHandler(() => {
        return UserService.getAllUser()
    });

    public static getUserById = wrapHandler((req: Request) => {
        return UserService.getUserById({ _id: req.params?.userId});
    });

    // public static getUserByEmail = wrapHandler((req: Request) => {
    //     return UserService.getUserByEmail(req.body?.email);
    // });
    
    public static createUser = wrapHandler((req: Request) => {
        const signup = UserSignup({ ...req.body});
        console.log('signup ', signup)
        return signup;
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