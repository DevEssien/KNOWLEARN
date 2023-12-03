import { Model } from 'mongoose';
import { IUser } from '../models/User';

export default class UserRepo {
    private userModel: Model<IUser>;

    constructor( userModel: Model<IUser> ) {
        this.userModel = userModel;
    }

    async createUser( email: String, password: String): Promise<IUser> {
        const newUser = new this.userModel({ email, password});
        return newUser.save();
    }

    async getUserById(_id: String ) {
        return this.userModel.findById(_id);
    }
}