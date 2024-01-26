import { Request, Response, NextFunction } from "express";
import { wrapHandler } from "../../utils/serviceWrapper";
import InitUserSignup from "../auth/services/initiateSignup";
import CompleteUserSignup from "../auth/services/completeSignup";
import UserLogin from "../auth/services/login";
// import { authMiddleware } from '../../core/decorators';
// import { SessionRequest } from "../../dto/app";
// import  Auth from '../../middleware/auth';
// import { TokenFlag } from "../../dto/app";
import { Controller, Post, Put } from "../../core/decorators";

@Controller({ basePath: "/users/auth" })
export default class AuthController {
	@Post("/signup")
	public static createUser(req: Request, res: Response, next: NextFunction) {
		return wrapHandler((req: Request) => {
			return InitUserSignup({ ...req.body });
		})(req, res, next);
	}

	@Post("/login")
	public static loginUser(req: Request, res: Response, next: NextFunction) {
		return wrapHandler((req: Request) => {
			return UserLogin({ ...req.body });
		})(req, res, next);
	}

	@Put("/verify-email")
	public static verifyEmail(req: Request, res: Response, next: NextFunction) {
		return wrapHandler((req: Request) => {
			const { email, otp } = req.body;
			return CompleteUserSignup(email, otp);
		})(req, res, next);
	}
}
