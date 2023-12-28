import { Request, Response, NextFunction } from "express";
import { wrapHandler } from '../../utils/serviceWrapper';
import UserService from "./services/user.service";
import InitUserSignup from '../auth/services/initiateSignup';
import CompleteUserSignup from '../auth/services/completeSignup';
import UserLogin from '../auth/services/login';
import { authMiddleware } from '../../core/decorators';
// import { SessionRequest } from "../../dto/app";
// import  Auth from '../../middleware/auth';
import { TokenFlag } from "../../dto/app";

export default class UserController {
    // @authMiddleware(TokenFlag.AUTH)
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
        return InitUserSignup({ ...req.body});
    });

    public static verifyEmail = wrapHandler((req: Request) => {
        const { email, otp} = req.body;
        return CompleteUserSignup(email, otp);
    })
    
    // @authMiddleware(TokenFlag.AUTH) //this is the issue
    public static updateUser(req: Request, res: Response, next: NextFunction) {
        return wrapHandler((request: Request) => {
           const req = request;
           const _id = request.params?.userId
           return UserService.updateUser( { _id }, { ...req.body } );
       })(req, res, next);
    }
    // public static updateUser = wrapHandler((request: Request) => {
    //         console.log('here in controller')
    //        const req = request;
    //        const _id = request.params?.userId
    //        return UserService.updateUser( { _id }, { ...req.body } );
    // });

    
    
    @authMiddleware(TokenFlag.AUTH)
    public static test(req: Request, res: Response) {
        try {
            const { role } = req.body;
            console.log('role ', role)
            const user = { 
                name: 'Essien Emmanuel', 
                email: 'essienemma300@gmail.com'
            }

            const userEmail = user['email'];
            return res.status(200).json({
                status: 'success',
                message: 'getting user email',
                data: { email: userEmail }
            });
        } catch (error) {
            console.log('- error:: ', error);
            return
        }
    }

    public static deleteOneUser = wrapHandler((req: Request ) => {
        const _id = req.params?.userId;
        return UserService.deleteUserById({ _id });
    })
}

