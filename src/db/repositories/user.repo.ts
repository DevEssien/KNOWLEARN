import { Model, FilterQuery, isValidObjectId } from "mongoose";
import { IUser } from "../models/user";
import { ServiceException } from "../../libs/exceptions";
import { ErrorMessages } from "../../libs/exceptions/messages";

export interface ICreateUser {
	email: string;
	password: string;
	fullName?: string;
}

export interface IRequestBody {
	[field: string]: string | number | boolean;
}

export default class UserRepo {
	private userModel: Model<IUser>;

	constructor(userModel: Model<IUser>) {
		this.userModel = userModel;
	}

	async getUserById(_id: string): Promise<any> {
		if (!isValidObjectId(_id)) throw new ServiceException(ErrorMessages.INVALID_OBJECT_ID);
		return this.userModel.findById(_id);
	}

	async getUserByEmail(email: string): Promise<any> {
		return this.userModel.findOne({ email });
	}

	async createUser(user: ICreateUser & Partial<IUser>): Promise<IUser> {
		const newUser = new this.userModel(user);
		return newUser.save();
	}

	async getAllUser(): Promise<any> {
		return this.userModel.find();
	}

	async updateUser(filter: FilterQuery<IUser>, user: Partial<IUser>): Promise<any> {
		return this.userModel.updateOne(filter, user);
	}

	async deleteUserById(filter: FilterQuery<IUser>): Promise<any> {
		return this.userModel.deleteOne(filter);
	}
}
