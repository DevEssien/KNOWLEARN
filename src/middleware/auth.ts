import { Response, NextFunction,  } from 'express';
import { TokenFlag, SessionRequest  } from '../dto/app';
import { AuthenticationException } from '../libs/exceptions/index';
import { decodeToken } from '../utils/index';
import { User } from '../controllers/user/services/user.service';
import { UserRole } from '../db/enums/index';

export default class Auth {
  static async  Authenticate(req: SessionRequest, _res: Response, next: NextFunction , tokenFlag: TokenFlag) {
    console.log('authenticating')
    const authorization = req.header('authorization') || '';
    const [ , token ] = authorization.split(' ');
    
    try {
      if (!token) return next(new AuthenticationException('No Authentication Token Found!'));
      
      const { userId: id, flag } = await decodeToken(token);
      
      if (!id) return next(new AuthenticationException('Unable to verify token'));

      if (!flag) return next(new AuthenticationException(`Token is not valid for ${tokenFlag}`))
      
      const user = await User.getUserById(id);
    
      if (!user) return next(new AuthenticationException('Token is Invalid!'));
      
      req.session = Object.assign(req.session || {}, {
        token,
        user,
        role: user.role as UserRole,
      });

      console.log('here in authenticating')
      next()

    } catch (error: any) {
      switch (error.name){
        case "TokenExpiredError":
          return next(new AuthenticationException('Token has Expired!'));
        case "jsonWebTokenError":
          return next(new AuthenticationException(error.message));
        case "NotBeforeError":
          return next(new AuthenticationException(error.message));
        default:
          return next(error);
      }
    }
  }

  static async checkIfUserIsAuthenticated(req: SessionRequest) {
    const authorization = req.header('authorization') || '';
    const [, token] = authorization?.split(' ');
    try {
      if (!token) return false;

      const { id } = await decodeToken(token);
      
      if (!id) return false;

      req.session = Object.assign(req.session || {}, {
        role: req.body.role as UserRole
      })

      return true
      
    } catch (error) {
      console.log('error:: ', error);
      return error
    }
  }
}