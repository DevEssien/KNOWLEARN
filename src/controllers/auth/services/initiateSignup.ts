import UserService, { User} from '../../user/services/user.service';
import { CreatedUserValidator } from '../../user/validators/index';
import checkSignupInfo from '../../user/validators/userSignupInfoCheck';
import { ResourceConflictException, ServiceException, ValidationException } from  '../../../libs/exceptions/index';
import { ErrorMessages } from  '../../../libs/exceptions/messages';
import { bcryptHash, generateJWT } from '../../../utils/index';
import { TokenFlag } from '../../../dto/app';
import { IServiceActionResult } from '../../../utils/serviceWrapper';
import { OTPStatus } from '../../../db/enums/index';
import OTPValidator from '../../../utils/otpValidator';

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

const otpValidator = new OTPValidator(20)

async function signup( signupFields: CreatedUserValidator ) {
  const { email, password, role } = signupFields;

  const errors = await checkSignupInfo(signupFields);

  if (errors.length > 0) throw new ValidationException(ErrorMessages.INVALID_INPUT, errors);

  let user = await User.getUserByEmail(email);
  if (user) throw new ResourceConflictException(ErrorMessages.ACCOUNT_EXIST);

  const hashedPassword = await bcryptHash(<string>password);

  if (!role) throw new ServiceException('Role does not exist');

  const otp = await otpValidator.generateOTP(6);

  //set otp expiration time to 20mins top
  const otpExpDate = otpValidator.generateOTPExpirationDate()
  
  //send welcome mail;

  user = await UserService.createUser({ 
    ...signupFields, 
    password: hashedPassword,
    otp: +otp,
    otp_status: OTPStatus.PENDING,
    otp_expiration_date: otpExpDate
  });
  
  const token = await generateJWT({ 
    userId:  user.id,
    flag: TokenFlag.AUTH,
    timestamp: Date.now(),
  });

  
  
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