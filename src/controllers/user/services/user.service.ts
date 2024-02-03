import "reflect-metadata";
import { IDValidator, GenericValidator } from "../validators/index";
import UserRepo, { ICreateUser } from "../../../db/repositories/user.repo";
import UserModel, { IUser } from "../../../db/models/user";
import {
	NotFoundException,
	ValidationException,
	ResourceConflictException,
	InternalServerException,
} from "../../../libs/exceptions/index";
import { ErrorMessages } from "../../../libs/exceptions/messages";
import { Validate } from "../../../utils/index";

export const User = new UserRepo(UserModel);

export default class UserService {
	public static async getAllUser() {
		const users = await User.getAllUser();

		if (users.length === 0) throw new NotFoundException(ErrorMessages.NO_FOUND_USER);

		return {
			message: "Fetched All Users successfully",
			data: { users },
		};
	}

	public static async getUserById(idDto: IDValidator) {
		const idValidatableField = new IDValidator(idDto._id);
		const errors = await Validate(idValidatableField);

		if (errors.length > 0) throw new ValidationException(ErrorMessages.INVALID_ID, errors);

		const user = await User.getUserById(idValidatableField._id);
		if (!user) throw new NotFoundException(ErrorMessages.NO_FOUND_USER);

		return {
			message: "Fetched user with id successfully",
			data: { user },
		};
	}

	public static async getUserByEmail(emailDto: GenericValidator): Promise<IUser> {
		const emailValidatableField = new GenericValidator(emailDto.email);
		const errors = await Validate(emailValidatableField);

		if (errors.length > 0) throw new ValidationException(ErrorMessages.INVALID_EMAIL, errors);

		const user = await User.getUserByEmail(emailValidatableField.email);
		if (!user) throw new NotFoundException(ErrorMessages.NO_FOUND_USER);

		return user;
	}

	public static async createUser(
		createUserDto: { confirmPassword: string; fullName: string } & Partial<Record<keyof IUser, any>>
	) {
		// const { email, fullName, password, confirmPassword, role, } = createUserDto;

		// const userValidatableFields = new CreatedUserValidator(email, password, confirmPassword, fullName, role, rawPassword);
		// const errors = await Validate(userValidatableFields);

		// if (errors.length > 0) throw new ValidationException(ErrorMessages.INVALID_INPUT, errors);

		const user = await User.getUserByEmail(createUserDto?.email);
		if (user) throw new ResourceConflictException(ErrorMessages.EMAIL_EXIST);

		const newUser = User.createUser({ ...(<ICreateUser>createUserDto) });
		if (!newUser) throw new InternalServerException("Unable To Create User!");

		return newUser;
	}

	// @Middleware([TokenFlag.AUTH])
	public static async updateUser(filter: IDValidator, updateUserDto: Partial<IUser>) {
		const idValidatableField = new IDValidator(filter._id);
		const errors = await Validate(idValidatableField);

		if (errors.length > 0) throw new ValidationException(ErrorMessages.INVALID_INPUT, errors);

		const updatedUser = await User.updateUser(filter, updateUserDto);
		if (!updatedUser) throw new InternalServerException("Unable To Update User!");

		if (updatedUser.modifiedCount !== 1)
			throw new NotFoundException(
				`Expected 1 document to be modified, but found ${updatedUser.modifiedCount}`
			);

		return {
			message: "Updated User Successfully",
			data: { ...updatedUser, updatedUser: await User.getUserById(filter._id) },
		};
	}

	public static async deleteUserById(filter: IDValidator) {
		const idValidatableField = new IDValidator(filter._id);
		const errors = await Validate(idValidatableField);

		if (errors.length > 0) throw new ValidationException(ErrorMessages.INVALID_INPUT, errors);

		const deletedUser = await User.deleteUserById(filter);

		if (!deletedUser) throw new InternalServerException("Unable To Delete User");

		if (deletedUser?.deletedCount === 0) throw new NotFoundException("User with ID Already Deleted");

		return {
			message: "Deleted User Successfully",
			data: { ...deletedUser, removedId: filter._id },
		};
	}
}
