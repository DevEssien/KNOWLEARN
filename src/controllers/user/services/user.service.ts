import 'reflect-metadata';
import { validate } from 'class-validator';
import { CreatedUserValidator } from '../validators/index';
import UserRepo from '../../../db/repositories/user.repo';
import UserModel, { IUser } from '../../../db/models/User';
import { IServiceActionResult } from '../../index';
import { NotFoundException, ValidationException } from '../../../libs/exceptions/index';

const User = new UserRepo(UserModel);

const userServicePartRes: IServiceActionResult = {
  status: 'success',
  statusCode: 200,
  message: '',
  data: {}
}

export default class UserService {
  public static async getAllUser() {
    const users = await User.getAllUser();

    if (users.length  === 0) throw new NotFoundException('No user found');

    return  {
      ...userServicePartRes,
      message: 'Fetched All Users successfully',
      data: { users },
    };
  }
  
  public static async createUser(createUserDto: CreatedUserValidator ) {
    const { email, fullName, password } = createUserDto;

    const userValidatableFields = new CreatedUserValidator(email, password, fullName);
    const errors = await validate(userValidatableFields, { validationError: { target: false }});

    if (errors.length > 0) throw new ValidationException('Invalid Input! Check Inputs', errors);

    const user = await User.getUserByEmail(createUserDto?.email);
    if (user) throw new Error('User email already exist');

    const newUser = await User.createUser(createUserDto);
    if (!newUser) throw new Error('unable to create user')

    return  {
      ...userServicePartRes,
      message: 'User created successfully',
      data: { createdUser: newUser },
    };
  }

  public static async updateUser(updateUserDto: Partial<IUser>) {
    return updateUserDto;
  }
}