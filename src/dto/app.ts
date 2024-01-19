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

export enum ControllerDecoratorParams {
  PATH = 'path',
  METHOD = 'method',
  MIDDLEWARE = 'middleware'
}

export enum MetadataKeys {
  BASE_PATH = 'base_path',
  ROUTERS = 'routers',
}


export enum HttpMethods {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete',
  PATCH = 'patch',
  OPTIONS = 'options'
}

export interface IRouter {
  method: HttpMethods;
  path?: string | '';
  handlerName: string | symbol;
}