import 'reflect-metadata';
import { validate } from 'class-validator';
import { CreatedUserValidator, IDValidator } from '../validators/index';
import UserRepo, {ICreateUser} from '../../../db/repositories/user.repo';
import UserModel, { IUser } from '../../../db/models/User';
import { IServiceActionResult } from '../../../utils/serviceWrapper';
import { NotFoundException, ValidationException, ResourceConflictException, InternalServerException, ServiceException } from '../../../libs/exceptions/index';
import { ErrorMessages } from '../../../libs/exceptions/messages';

const User = new UserRepo(UserModel);

const userServicePartResponse: IServiceActionResult = {
  status: 'success',
  statusCode: 200,
  message: '',
  data: {}
}

export default class UserService {
  public static async getAllUser() {
    const users = await User.getAllUser();

    if (users.length  === 0) throw new NotFoundException(ErrorMessages.NO_FOUND_USER);

    return  {
      ...userServicePartResponse,
      message: 'Fetched All Users successfully',
      data: { users },
    };
  }

  public static async getUserById(idDto: IDValidator) {
    const idValidatableField = new IDValidator(idDto._id);
    const errors = await validate(idValidatableField);
    
    if (errors.length > 0) throw new ValidationException(ErrorMessages.INVALID_ID, errors);

    let user;

    try {
      user = await User.getUserById(idValidatableField._id);
      if (!user) throw new NotFoundException(ErrorMessages.NO_FOUND_USER);
  
    } catch (error) {
      throw new ServiceException(ErrorMessages.INVALID_OBJECT_ID);
    }
    
    return {
      ...userServicePartResponse,
      message: 'Fetched user with id successfully',
      data: { user }
    }
  }
  
  public static async createUser(createUserDto: CreatedUserValidator ) {
    const { email, fullName, password } = createUserDto;

    const userValidatableFields = new CreatedUserValidator(email, <string>password, fullName);
    const errors = await validate(userValidatableFields, { validationError: { target: false }});

    if (errors.length > 0) throw new ValidationException(ErrorMessages.INVALID_INPUT, errors);

    const user = await User.getUserByEmail(createUserDto?.email);
    if (user) throw new ResourceConflictException(ErrorMessages.EMAIL_EXIST);

    const newUser = await User.createUser(<ICreateUser>createUserDto);
    if (!newUser) throw new InternalServerException(ErrorMessages.CREATE_USER_FAILED);

    return  {
      ...userServicePartResponse,
      message: 'User created successfully',
      data: { createdUser: newUser },
    };
  }

  public static async updateUser(updateUserDto: Partial<IUser>) {
    return updateUserDto;
  }
}
