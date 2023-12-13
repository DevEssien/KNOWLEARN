import UserService, { User} from '../../user/services/user.service';
import { CreatedUserValidator } from '../../user/validators/index';
import { ResourceConflictException, ServiceException } from  '../../../libs/exceptions/index';
import { ErrorMessages } from  '../../../libs/exceptions/messages';
import { bcryptHash, generateJWT } from '../../../utils/index';
import { TokenFlag } from '../../../dto/app';
import { IServiceActionResult } from '../../../utils/serviceWrapper';

/**
 * On signup:
 * ------------
 * - Check if user exists
 * - Get the user specified role
 * - Hash the user password
 * - Create the user with the hashed password
 * - Create the user setting
 * - Generate the session token
 * - Send welcome email
 **/

async function signup( signupFields: CreatedUserValidator ) {
  const { email, password, role } = signupFields;

  let user = await User.getUserByEmail(email);
  if (user) throw new ResourceConflictException(ErrorMessages.ACCOUNT_EXIST);

  const hashedPassword = await bcryptHash(<string>password);

  if (!role) throw new ServiceException('Role does not exist');

  user = await UserService.createUser({ 
    ...signupFields, 
    password: hashedPassword
  });
  
  const token = await generateJWT({ 
    userId:  user.id,
    flag: TokenFlag.AUTH,
    timestamp: Date.now(),
  });

  //send otp
  //send welcome mail;
  
  let responseData: IServiceActionResult;

  responseData = {
    statusCode: 201,
    message: 'User created successfully',
    data: { createdUser: { ...user._doc, password: 'hidden' }},
    token: {
      flag: TokenFlag.AUTH,
      value: token
    }
  }

  return responseData;
}

export default signup;