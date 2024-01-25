import { RequestHandler } from "express";

export interface IMail {
	email: string;
	templateContent: string;
	subject?: string;
	data?: Record<string, any>;
}

export type TMiddlewares = RequestHandler[] | RequestHandler;

export interface ISender<T> {
	send(mail: IMail): Promise<T>;
}

export enum ResponseStatus {
	SUCCESS = "success",
	FAILED = "failed",
}

export type TServiceSuccessResponse = {
	status: ResponseStatus;
	message: string;
	data: object;
};
