import bcrypt from 'bcryptjs';
import { validate } from 'class-validator';
import * as jwt from 'jsonwebtoken';
import config from '../config';


// type TJwtData = {
//   userId: string;
//   flag: TokenFlag
// }

export function bcryptHash(password: string) {
  return bcrypt.hash(password, config.app.saltRounds);
}

export function comparePassword(password: string, hashedPassword: string) {
  return bcrypt.compare(password, hashedPassword);
}

export function generateJWT( payload: Record<string, any>, secret: string = config.app.secret, expiresIn?: string ): Promise<string> {
  const jwtPayload = { ...payload };
  const expirationTime: string = expiresIn || '720h';

  return new Promise((resolve, reject) => {
    jwt.sign(jwtPayload, secret, { expiresIn: expirationTime }, (error: any, token: string | undefined) => {
      if (error) return reject(error) 
      return resolve(<string>token)
    });
  });
}

export function Validate<T extends Record<string, any>>(Tobj: T) {
  return validate( Tobj,  { validationError: { target: false }} );
}

export function generateOTP(length: number = 6): Promise<string> {
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

// function elapseTime(duration: number) {

// }