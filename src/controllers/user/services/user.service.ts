import 'reflect-metadata';
import { validate } from 'class-validator';
import { CreatedUserValidator } from '../validators/index';
import UserRepo from '../../../db/repositories/user.repo';
import UserModel from '../../../db/models/User';
import { IServiceActionResult } from '../../index';

const User = new UserRepo(UserModel);

const userServicePartRes: IServiceActionResult = {
  status: 'success',
  statusCode: 200,
  message: '',
  data: {}
}

export class UserService {
  public static async getAllUser() {
    const users = await User.getAllUser();

    if (!users) throw new Error('No user found');

    return  {
      ...userServicePartRes,
      message: 'User created successfully',
      data: users,
    };
  }
  
  public static async createUser(createUserDto: CreatedUserValidator ) {
    const errors = await validate(createUserDto);

    if (errors.length > 0) throw new Error('invalid input type');

    return  {
      ...userServicePartRes,
      message: 'User created successfully',
      data: createUserDto,
    };
  }
}