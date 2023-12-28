import { TokenFlag , } from '../dto/app';
import Auth from '../middleware/auth';

export function authMiddleware(tokenFlag: TokenFlag) {
  return (_target: any, _propertyKey: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;

    descriptor.value = async function (req: any, res: any, next: any, ...args: any[]) {
      // Check authentication logic here
      await Auth.Authenticate(req, res, next, tokenFlag); //checkIfUserIsAuthenticated(req);

      // if (!isAuthenticated) {
      //   return res.status(401).json({ error: "Unauthorized" });
      // };
   
      return originalMethod.apply(this, [req, res, ...args]);
    }
  }
}