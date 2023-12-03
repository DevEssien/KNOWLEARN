import { RequestHandler } from "express";
import UserRepo from '../../../db/repositories/user.repo';
import UserModel from '../../../db/models/User';
import { TServiceSuccessResponse, ResponseStatus } from '../../../types';

const User = new UserRepo(UserModel)

export const createUser: RequestHandler = async (req, res, next): Promise<any> => {
    try {
        const { email, password } = req.body;
        
        const user = await User.createUser(email, password);
        if (!user) throw new Error('Unable  to create user'); 

        const resData: TServiceSuccessResponse = {
            status: ResponseStatus.SUCCESS,
            message: 'created a user',
            data: { user: user } 
        }
        return res.status(201).json(resData);
    } catch (error) {
        next(error);
    }
}