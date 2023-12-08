import 'reflect-metadata';
import { validate } from 'class-validator';
import { CreatedUserValidator, IDValidator, GenericValidator } from '../validators/index';
import UserRepo, {ICreateUser} from '../../../db/repositories/user.repo';
import UserModel, { IUser} from '../../../db/models/User';
import { IServiceActionResult } from '../../../utils/serviceWrapper';
import { NotFoundException, ValidationException, ResourceConflictException, InternalServerException } from '../../../libs/exceptions/index';
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

    const user = await User.getUserById(idValidatableField._id);
    if (!user) throw new NotFoundException(ErrorMessages.NO_FOUND_USER);
  
    return {
      ...userServicePartResponse,
      message: 'Fetched user with id successfully',
      data: { user }
    }
  }

  public static async getUserByEmail(emailDto: GenericValidator) {
    const emailValidatorField = new GenericValidator(emailDto.email);
    const errors = await validate(emailValidatorField);

    if (errors.length > 0) throw new ValidationException(ErrorMessages.INVALID_EMAIL, errors);

    const user = await User.getUserByEmail(emailValidatorField.email);
    if (!user) throw new NotFoundException(ErrorMessages.NO_FOUND_USER);

    return {
      ...userServicePartResponse,
      message: 'Fetched user with email successfully',
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
    if (!newUser) throw new InternalServerException('Unable To Create User!');

    return  {
      ...userServicePartResponse,
      message: 'User created successfully',
      data: { createdUser: newUser },
    };
  }

  public static async updateUser(filter: IDValidator, updateUserDto: Partial<IUser>) {
    const idValidatableField = new IDValidator(filter._id);
    const errors = await validate(idValidatableField);
  
    if (errors.length > 0) throw new ValidationException(ErrorMessages.INVALID_INPUT, errors);
  
    const updatedUser = await User.updateUser(filter, updateUserDto);
    if (!updatedUser) throw new InternalServerException('Unable To Update User!');

    if (updatedUser.modifiedCount !== 1) throw new NotFoundException(`Expected 1 document to be modified, but found ${updatedUser.modifiedCount}`);

    return {
      ...userServicePartResponse,
      message: 'Updated User Successfully',
      data: {...updatedUser, updatedUser: await User.getUserById(filter._id) }
    }
  }

  public static async deleteUserById(filter: IDValidator) {
    const idValidatableField = new IDValidator(filter._id);
    const errors = await validate(idValidatableField);
  
    if (errors.length > 0) throw new ValidationException(ErrorMessages.INVALID_INPUT, errors);

    const deletedUser  = await User.deleteUserById(filter);
    
    if (!deletedUser) throw new InternalServerException('Unable To Delete User');

    if (deletedUser?.deletedCount === 0) throw new NotFoundException('User with ID Already Deleted')

    return {
      ...userServicePartResponse,
      message: 'Deleted User Successfully',
      data: { ...deletedUser, removedId: filter._id }
    }
  }
}
