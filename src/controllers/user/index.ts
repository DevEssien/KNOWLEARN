import { Request, Response, NextFunction } from "express";
import { wrapHandler } from "../../utils/serviceWrapper";
import UserService from "./services/user.service";
import { authMiddleware, Controller, Get, Put, Delete } from "../../core/decorators";
import { TokenFlag } from "../../dto/app";

@Controller({
	basePath: "/users",
})
export default class UserController {
	@Get()
	@authMiddleware(TokenFlag.AUTH)
	public static async getAllUser(req: Request, res: Response, next: NextFunction) {
		return wrapHandler(() => {
			return UserService.getAllUser();
		})(req, res, next);
	}

	@Get("/:userId")
	@authMiddleware(TokenFlag.AUTH)
	public static getUserById(req: Request, res: Response, next: NextFunction) {
		return wrapHandler((req) => {
			type reqParamsKeyType = keyof typeof req.params;
			const _id = req.params?.userId;
			return UserService.getUserById({ _id: _id as reqParamsKeyType as string });
		})(req, res, next);
	}

	@authMiddleware(TokenFlag.AUTH)
	@Put("/:userId")
	public static updateUser(req: Request, res: Response, next: NextFunction) {
		return wrapHandler((req: Request) => {
			type reqParamsKeyType = keyof typeof req.params;
			const _id = req.params?.userId;
			return UserService.updateUser({ _id: _id as reqParamsKeyType as string }, { ...req.body });
		})(req, res, next);
	}

	// @authMiddleware(TokenFlag.AUTH)
	public static test(req: Request, res: Response, next: NextFunction) {
		try {
			const { role } = req.body;
			console.log("controller next:: ", next);

			const user = {
				name: "Essien Emmanuel",
				email: "essienemma300@gmail.com",
			};

			const userEmail = user["email"];
			return res.status(200).json({
				status: "success",
				code: 200,
				message: "getting user email",
				data: { email: userEmail, role },
			});
		} catch (error) {
			console.log("- error:: ", error);
			return;
		}
	}

	@Delete("/userId")
	public static deleteOneUser(req: Request, res: Response, next: NextFunction) {
		return wrapHandler((req: Request) => {
			type reqParamsKeyType = keyof typeof req.params;
			const _id = req.params?.userId;
			return UserService.deleteUserById({ _id: _id as reqParamsKeyType as string });
		})(req, res, next);
	}
}
