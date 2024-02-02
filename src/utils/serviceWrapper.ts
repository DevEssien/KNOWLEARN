import { Request, Response, NextFunction, RequestHandler } from "express";
import { TokenFlag } from "../dto/app";
// import { ServiceException } from "../libs/exceptions/index";

export interface IServiceActionResult {
	status?: "success";
	statusCode?: number;
	message: string;
	data?: Record<string, any>;
	token?: {
		flag: TokenFlag;
		value: string;
	} | null;
}

type HandlerFn = ((req: Request) => Promise<IServiceActionResult>) | (() => Promise<IServiceActionResult>);

export function wrapHandler(handler: HandlerFn): RequestHandler {
	return async function (req: Request | any, res: Response, next: NextFunction) {
		try {
			const {
				token = null,
				data = null,
				statusCode = 200,
				message = "The request was successful",
			} = await handler(req);

			const retrievedToken = req.session ? req.session.token : token;

			return res.status(200).json({
				status: "success",
				statusCode,
				message,
				data,
				token: retrievedToken,
			});
		} catch (error: any) {
			return next(error);
		}
	};
}
