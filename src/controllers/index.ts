import { Request, Response, NextFunction, RequestHandler } from 'express';

export interface IServerActionResult {
  status: string;
  statusCode: number;
  message: string;
  data?: any;
}

type HandlerFn = (( req: Request ) => Promise<IServerActionResult>) | (() => Promise<IServerActionResult>)

export  function wrapHandler(handler: HandlerFn): RequestHandler {
  return async function(req: Request, res: Response, next: NextFunction ) {
    try {
      const { data, statusCode = 200, message = 'The request was successful' } = await handler(req);

      return res.status(200).json({
        status: 'success',
        statusCode,
        message,
        data
      });
    } catch (error) {
      return next(error)
    }
  }
}