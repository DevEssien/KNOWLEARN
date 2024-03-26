import express, { Router, Request, Response, NextFunction } from "express";
import "reflect-metadata";
import { MetadataKeys, IRouter } from "../../dto/app";
import UserController from "../../controllers/user/index";
import AuthController from "../../controllers/auth/index";
import InstructorController from "../../controllers/controller/instructor";

const registerControllerRoutes = (router: Router, controller: any) => {
	const basePath: string = Reflect.getMetadata(MetadataKeys.BASE_PATH, controller);

	const routers: IRouter[] = Reflect.getMetadata(MetadataKeys.ROUTERS, controller) || [];

	for (const route of routers) {
		const { method, path, handlerName } = route;
		const fullPath = `${basePath}${path || ""}`;

		switch (method) {
			case "get":
				router.get(fullPath, (req: Request, res: Response, next: NextFunction) => {
					console.log("role ", req.body?.role);
					controller[handlerName](req, res, next);
				});
				break;

			case "post":
				router.post(fullPath, (req: Request, res: Response, next: NextFunction) => {
					controller[handlerName](req, res, next);
				});
				break;

			case "put":
				router.put(fullPath, (req: Request, res: Response, next: NextFunction) => {
					controller[handlerName](req, res, next);
				});
				break;

			case "patch":
				router.patch(fullPath, (req: Request, res: Response, next: NextFunction) => {
					controller[handlerName](req, res, next);
				});
				break;

			case "delete":
				router.delete(fullPath, (req: Request, res: Response, next: NextFunction) => {
					controller[handlerName](req, res, next);
				});
				break;
			// Add more cases for other HTTP methods
		}
	}
};

export const createRouter = (): Router => {
	const router = express.Router();

	// Register routes for UserController
	registerControllerRoutes(router, AuthController);

	registerControllerRoutes(router, UserController);

	registerControllerRoutes(router, InstructorController);

	// Add more controllers
	return router;
};
