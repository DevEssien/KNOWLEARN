import bcrypt from 'bcryptjs';
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
      if (error) reject(error) 
      resolve(<string>token)
    });
  });
}
