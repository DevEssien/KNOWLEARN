import { assert } from 'chai';

describe('GENERATE OTP TEST SUITE', () => {
  it('should generate otp with length of 6', () => {
    function generateOTP(length: number) {
      const numberBank = '7890123456'.split('');
      let otp = ''
    
      for (let i = length; i > 0; i--) {
        const randInd = Math.floor(Math.random() * numberBank.length);
        otp += numberBank[randInd];
        numberBank.splice(randInd, 1);
      }
      return otp;
    }
    const otp = generateOTP(6);
  
    assert.isOk(otp);
    assert.lengthOf(otp, 6);
  });

})