import express, { Router, Request, Response, NextFunction } from 'express';
import 'reflect-metadata'; // Make sure to import this for Reflect to work
import { MetadataKeys, IRouter } from '../dto/app'; // Import your metadata keys

// Import your controllers
import UserController from '../controllers/user/index';
import AuthController from '../controllers/auth/index';


const registerControllerRoutes = (router: Router, controller: any) => {
  const basePath: string = Reflect.getMetadata(MetadataKeys.BASE_PATH, controller);

  const routers: IRouter[] = Reflect.getMetadata(MetadataKeys.ROUTERS, controller) || [];

  routers.forEach(route => {
    const { method, path, handlerName } = route;
    const fullPath = `${basePath}${path || ''}`;  
    
    // Here you would add middleware or other route-specific configurations if needed
    switch (method) {
      case 'get':
        router.get(fullPath, (req: Request, res: Response, next: NextFunction) => {
          controller[handlerName](req, res, next);
        });
        break;
      case 'post':
        router.post(fullPath, (req: Request, res: Response, next: NextFunction) => {
          controller[handlerName](req, res, next);
        });
        break;
      // Add more cases for other HTTP methods
    }
  });
};

export const createRouter = (): Router => {
  const router = express.Router();
  // Register routes for UserController
  registerControllerRoutes(router, AuthController);
  
  registerControllerRoutes(router, UserController);

  // Add more controllers as needed
  return router;
};