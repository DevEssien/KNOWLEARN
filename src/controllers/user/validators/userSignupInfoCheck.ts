import { Validate} from '../../../utils/index';
import { CreatedUserValidator } from './index';
import { IUser } from '../../../db/models/User';

export default async function(createUserDto: { confirmPassword: string, fullName: string } & Partial<Record<keyof IUser, any>>) {
  const { email, fullName, password, confirmPassword, role, } = createUserDto;
  
  const userValidatableFields = new CreatedUserValidator(email, password, confirmPassword, fullName, role);
  const errors = await Validate(userValidatableFields);

  return errors
}