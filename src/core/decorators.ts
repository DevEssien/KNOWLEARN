// import { TokenFlag , } from '../dto/app';
// import Auth from '../middleware/auth';
// import { NextFunction, RequestHandler } from 'express';
// import { HttpMethods, ControllerDecoratorParams } from '../dto/app';

// export function authMiddleware(tokenFlag: TokenFlag) {
//   return (_target: any, _propertyKey: string, descriptor: PropertyDescriptor) => {
//     const originalMethod = descriptor.value;

//     // console.log('Decorator - original next:', descriptor.value.toString());
//     descriptor.value = async function (req: any, res: any, next: NextFunction, ...args: any[]) {
//       // console.log('decorator next:: ', next.toString())
//       // Check authentication logic here
//       await Auth.Authenticate(req, res, next, tokenFlag); //checkIfUserIsAuthenticated(req);
      
//       // if (!isAuthenticated) {
//         //   return res.status(401).json({ error: "Unauthorized" });
//         // };
        
//       // console.log('decorator second next:: ', next.toString())
//       console.log('decorator');
//       return originalMethod.apply(this, [req, res, next, ...args]);
//     }
//     // return descriptor;
//   }
// }

// export function Middleware(middlewares: RequestHandler[]): Function {
//   return function (target: any, propertyKey: string): void {
//     Reflect.defineMetadata(
//       ControllerDecoratorParams.MIDDLEWARE,
//       middlewares,
//       target,
//       propertyKey
//     );
//   };
// }

// function createRouteMethod(method: HttpMethods) {
//   return function (path?: string): Function {
//     return function (target: any, propertyKey: string): void {
//       Reflect.defineMetadata(
//         ControllerDecoratorParams.PATH,
//         path,
//         target,
//         propertyKey
//       );
//       Reflect.defineMetadata(
//         ControllerDecoratorParams.METHOD,
//         method,
//         target,
//         propertyKey
//       );
//     };
//   }
// }

// import userRouter from "../routers/user/index";

// export function Controller(path: string): Function {
//   return function (target: any): void {
//     const router = userRouter;
//     console.log('here router ', router)

//     for (const _action in target.prototype) {
//       if (target.prototype.hasOwnProperty(_action)) {
//         const _path: string =
//           Reflect.getMetadata(
//             ControllerDecoratorParams.PATH,
//             target.prototype,
//             _action
//           ) || "";
//         const method: HttpMethods = Reflect.getMetadata(
//           ControllerDecoratorParams.METHOD,
//           target.prototype,
//           _action
//         );
//         const middlewares: RequestHandler[] =
//           Reflect.getMetadata(
//             ControllerDecoratorParams.MIDDLEWARE,
//             target.prototype,
//             _action
//           ) || [];

//         router[method](
//           `${path}${_path}`,
//           middlewares,
//           target.prototype[_action]
//         );
//       }
//     }
//   };
// }

// export const Get = createRouteMethod(HttpMethods.GET);
// export const Post = createRouteMethod(HttpMethods.POST);
// export const Put = createRouteMethod(HttpMethods.PUT);
// export const Patch = createRouteMethod(HttpMethods.PATCH);
// export const Delete = createRouteMethod(HttpMethods.DELETE);

import { MetadataKeys, HttpMethods, IRouter } from '../dto/app';
import 'reflect-metadata'; 

export function Controller(basePath: string): ClassDecorator {
  return (target) => {
    Reflect.defineMetadata(MetadataKeys.BASE_PATH, basePath, target);
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