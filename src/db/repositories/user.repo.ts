import { Model, FilterQuery } from 'mongoose';
import { IUser } from '../models/User';

export interface ICreateUser {
    email: string;
    password: string;
    fullName?: string;
}

export interface IRequestBody {
    [ field: string ]: string | number | boolean;
}

export default class UserRepo {
    private userModel: Model<IUser>;

    constructor( userModel: Model<IUser> ) {
        this.userModel = userModel;
    }

    async getUserById(_id: String ): Promise<any> {
        return this.userModel.findById(_id);
    }

    async getUserByEmail(email: string): Promise<any> {
        return this.userModel.findOne({ email: email });
    }

    async createUser( { email, password, fullName } : ICreateUser ): Promise<any> {
        const newUser = new this.userModel({ email, password, fullName});
        return newUser.save();
    }

    async getAllUser(): Promise<any> {
        return this.userModel.find()
    }

    async updateUser(filter: FilterQuery<IUser>, user: Partial<IUser> ): Promise<any> {
        return this.userModel.updateOne(filter, user)
    }

    async deleteUserById( filter: FilterQuery<IUser>): Promise<any> {
        return this.userModel.deleteOne(filter)
    }
}