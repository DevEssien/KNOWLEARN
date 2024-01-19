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
  return async function(req: Request, res: Response, next: NextFunction ) {
    try {
      const { token = null, data  = null, statusCode = 200, message = 'The request was successful' } = await handler(req);

      // console.log('wrapper success next:: ', next.toString())
      // console.log('in handler')
      return res.status(200).json({
        status: 'success',
        statusCode,
        message,
        data,
        token
      });
    } catch (error: any) {
      // console.log('wrapper error next:: ', next)
      // console.log('wrapper error:: ', error)
      return next(error);
    }
  }
}