import { Request, Response, NextFunction, RequestHandler } from 'express';

export interface IServiceActionResult {
  status?: 'success';
  statusCode?: number;
  message: string;
  data?: Record<string, any>;
  token?: {
    flag: string,
    value: string
  } | null
}

type HandlerFn = (( req: Request ) => Promise<IServiceActionResult>) | (() => Promise<IServiceActionResult>)

export  function wrapHandler(handler: HandlerFn): RequestHandler {
  return async function(req: Request, res: Response, next: NextFunction ) {
    try {
      const { token = null, data  = null, statusCode = 200, message = 'The request was successful' } = await handler(req);
      console.log('service wrapper entered')

      return res.status(200).json({
        status: 'success',
        statusCode,
        message,
        data,
        token
      });
    } catch (error) {
      return next(error);
    }
  }
}