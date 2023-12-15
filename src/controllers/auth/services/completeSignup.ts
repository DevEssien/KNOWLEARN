import { User } from '../../user/services/user.service';
import { NotFoundException, ServiceException, InternalServerException } from '../../../libs/exceptions/index';
import { ErrorMessages } from '../../../libs/exceptions/messages';
import { OTPStatus } from '../../../db/enums/index';
import OTPValidator from '../../../utils/otpValidator';
import { generateJWT } from '../../../utils/index';
import { IServiceActionResult } from '../../../utils/serviceWrapper';
import { TokenFlag } from '../../../dto/app';

export default async function(email: string, otp: number): Promise<IServiceActionResult> {
  const user = await User.getUserByEmail(email);
  if (!user) throw new NotFoundException(ErrorMessages.NO_FOUND_USER);

  if (user.otp_status === OTPStatus.ACTIVE) throw new ServiceException('OTP Already Verified!');

  const isValidOTP = OTPValidator.isValidOTP(otp, user?.otp, user?.otp_expiration_date);

  if ('error' in isValidOTP) {
    await User.updateUser({ _id: user?._id }, {  otp_status: OTPStatus.EXPIRED });
    throw new ServiceException('OTP has Expired');
  }

  if ('isOTP' in isValidOTP && !isValidOTP.isOTP) throw new ServiceException('Incorrect OTP!');

  const updatedUser = await User.updateUser({ _id: user?._id }, {  otp_status: OTPStatus.ACTIVE });
  if (!updatedUser) throw new InternalServerException(ErrorMessages.UPDATE_USER_FAILED);

  const token = await generateJWT({
    userId: user?._id,
    flag: TokenFlag.EMAIL_VERIFICATION,
    timestamp: Date.now()
  });

  const getUpdatedUser = await User.getUserById(user._id);
  
  return {
    message: 'congratulations! OTP verified sucessfully',
    data: { ...getUpdatedUser._doc, password: 'hidden' },
    token: {
      flag: TokenFlag.EMAIL_VERIFICATION,
      value: token
    }
  }
}
