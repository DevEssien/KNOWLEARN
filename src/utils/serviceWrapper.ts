import { Request, Response, NextFunction, RequestHandler } from 'express';
import { TokenFlag } from '../dto/app';

export interface IServiceActionResult {
  status?: 'success';
  statusCode?: number;
  message: string;
  data?: Record<string, any>;
  token?: {
    flag: TokenFlag,
    value: string
  } | null
}

type HandlerFn = (( req: Request ) => Promise<IServiceActionResult>) | (() => Promise<IServiceActionResult>);

export  function wrapHandler(handler: HandlerFn): RequestHandler {
  return async function(req: Request | any, res: Response, next: NextFunction ) {
    try {
      const { data  = null, statusCode = 200, message = 'The request was successful' } = await handler(req);
      const token = req.session.token ?? null

      return res.status(200).json({
        status: 'success',
        statusCode,
        message,
        data,
        token
      });
    } catch (error: any) {
      return next(error);
    }
  }
}