import { Request, Response, NextFunction } from 'express';
import { APIError } from '../core/ApiError';
import config, { AppENV } from '../config';
import { App } from '@obisiket1/express-utils';
// import { logger } from '../libs/logger/index';

interface IAppEnum {
  TEST: string;
  PROD: string;
}
const { TEST, PROD }: IAppEnum = AppENV;

export class GeneralMiddleware {
  static ErrorHandler(error: Error | APIError, req: Request, res: Response, next: NextFunction) {

    if (res.headersSent) return;

    if ([TEST, PROD].includes(config.app.env)) console.log(error);

    if ('getType' in error) {
      return res.status(error?.statusCode || 500).json({
        status: 'error',
        type: error.name,
        timestamp: Date.now(),
        ...((error as any).errors ? { message: error.message, errors: (error as any).errors} : { message: error.message}),
        ...(![TEST, PROD].includes(config.app.env) ? { stack: error.stack } : {})
      });
    }

    return res.status(500).json({
      status: 'error',
      type: 'InternalServerError',
      timestamp: Date.now(),
      message: 'Something went wrong',
      ...(![TEST, PROD].includes(config.app.env) ? { stack: error?.stack } : {})
    });
  }
}

