import { Response, NextFunction } from 'express';
import { TokenFlag, SessionRequest  } from '../dto/app';
import { AuthenticationException } from '../libs/exceptions/index';
import { decodeToken } from '../utils/index';
import { User } from '../controllers/user/services/user.service';
import { UserRole } from '../db/enums/index';

class Auth {
  static Authenticate(tokenFlag: TokenFlag) {
    async (req: SessionRequest, res: Response, next: NextFunction ) => {
      const authorization = req.header('authorization') || '';
      const [ , token ] = authorization.split(' ');

      try {
        if (!token) return next(new AuthenticationException('No Authentication Token Found!'));

        const { id, tokenFlag: flag } = await decodeToken(token);

        if (!id) return next(new AuthenticationException('Unable to verify token'));

        if (flag !== tokenFlag) return next(new AuthenticationException(`Token is not valid for ${tokenFlag}`))

        const user = await User.getUserById(id);
        if (!user) return next(new AuthenticationException('Token is Invalid!'));

        req.session = Object.assign(req.session || {}, {
          token,
          user,
          role: user.role as UserRole,
        });

        return next()
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
  }
}