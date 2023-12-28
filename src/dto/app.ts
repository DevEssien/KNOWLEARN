import { UserRole } from '../db/enums/index';
import { Request } from 'express';


export enum TokenFlag {
  AUTH = 'auth',
  EMAIL_VERIFICATION = 'email-verification'
}

export interface SessionRequest extends Request {
  session: {
    user: any;
    role: UserRole;
    [ key: string ]: any;
  }
}

export enum Role {
  ADMIN = 'admin',
  SUPERADMIN = 'superadmin'
}