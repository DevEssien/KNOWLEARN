export default class OTPValidator {
  private otpExpirationMinutes: number;

  constructor(otpExpirationMinutes: number = 20) {
    this.otpExpirationMinutes = otpExpirationMinutes
  }

  public static generateOTP(length: number = 6): Promise<string> {
    const numberBank = '7890123654'.split('');
    let otp = ''

    for (let i = length; i > 0; i--) {
      const randInd = Math.floor(Math.random() * numberBank.length);
      otp += numberBank[randInd];
      numberBank.splice(randInd, 1);
    }

    return new Promise((resolve, reject) => {
      if (otp.length !== length) return reject(`OTP is not of length ${length}`);
      return resolve(otp);
    });
  }

  public static isValidOTP( inputOTP: number, referenceOTP: number, otpExpirationTime: Date) {  
    const currentTime = new Date(); 
    const validTime =   otpExpirationTime > currentTime;
    return inputOTP  && validTime && referenceOTP === inputOTP;
  }

  public generateOTPExpirationDate() {
    const date = new Date();
    const otpExpDate = new Date(date.getTime() + ( this.otpExpirationMinutes * 60 * 1000 ));
    return otpExpDate
  }
}