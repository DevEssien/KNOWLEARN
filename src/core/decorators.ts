import 'reflect-metadata'; 
import { Response, NextFunction } from 'express';
import Auth from '../middleware/auth';
import { MetadataKeys, HttpMethods, IRouter, TokenFlag } from '../dto/app';

export function authMiddleware(tokenFlag: TokenFlag): MethodDecorator {
  return (_target: any, _propertyKey: string | symbol, descriptor: PropertyDescriptor ) => {
    const originalMethod = descriptor.value;
    originalMethod;

    descriptor.value = async function ( req: any, res: Response, next: NextFunction, ...args: any[] ) {
      await Auth.Authenticate(req, res, next, tokenFlag);

      return originalMethod.apply(this, [req, res, next, ...args])
    }
  }
}

type TControllerPayload = {
  basePath: string,
  use?: any[]
}

export function Controller(controllerPayload:TControllerPayload): ClassDecorator {
  return (target: any) => {
    Reflect.defineMetadata(MetadataKeys.BASE_PATH, controllerPayload.basePath, target);
  };
}

const methodDecoratorFactory = (method: HttpMethods) => {
  return (path: string = ''): MethodDecorator => {
    return (target: any, propertyKey: string | symbol) => {

      const routers: IRouter[] =   Reflect.hasMetadata(MetadataKeys.ROUTERS, target) ?
        Reflect.getMetadata(MetadataKeys.ROUTERS, target) : [];

      routers.push({
        method,
        path,
        handlerName: propertyKey,
      });

      Reflect.defineMetadata(MetadataKeys.ROUTERS, routers, target);
    }
  }
}
export const Get = methodDecoratorFactory(HttpMethods.GET);
export const Post = methodDecoratorFactory(HttpMethods.POST);
export const Put = methodDecoratorFactory(HttpMethods.PUT);
export const Patch = methodDecoratorFactory(HttpMethods.PATCH);
export const Delete = methodDecoratorFactory(HttpMethods.DELETE);