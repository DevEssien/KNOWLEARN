import { User } from '../../user/services/user.service';
import { NotFoundException, ServiceException } from '../../../libs/exceptions/index';
import { ErrorMessages } from '../../../libs/exceptions/messages';


async function verifyEmailOTP(email: string, otpNumber: number) {
  const user = await User.getUserByEmail(email);
  if (!user) throw new NotFoundException(ErrorMessages.NO_FOUND_USER);

  //check time then
  const otpExpirationTime = user.otp_expiration_date;
  const currentTime = new Date();
  
  const isValidOTP =   otpExpirationTime > currentTime;
  if (!isValidOTP) throw new ServiceException('OTP Has Expired');

  //check otp
  const isOTP = user.otp === otpNumber;

  //verify 
  if (!isOTP) throw new ServiceException('Incorrect OTP!');

  //return true if email otp
  return isOTP
}

async function UserAuthStatusUpdate() {
  
}