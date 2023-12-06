import { Request, Response, NextFunction } from 'express';
import rateLimit from 'express-rate-limit';
import { getClientIp } from '@supercharge/request-ip';
import cors from 'cors';
import helmet from 'helmet';
import { APIError } from '../core/ApiError';
import config, { AppENV } from '../config';
import { logger } from '../libs/logger';
// import { logger } from '../libs/logger/index';

interface IAppEnum {
  TEST: string;
  PROD: string;
}
const { TEST, PROD }: IAppEnum = AppENV;

export default class GeneralMiddleware {
  static ErrorHandler(error: Error | APIError, _req: Request, res: Response, _next: NextFunction) {

    if (res.headersSent) return;

    if ([TEST, PROD].includes(config.app.env)) console.log(error);

    if ('getType' in error) {
      return res.status(error?.statusCode || 500).json({
        status: 'error',
        statusCode: error.statusCode,
        type: error.name,
        timestamp: Date.now(),
        ...((error as any).errors ? { message: error.message, errors: (error as any).errors} : { message: error.message}),
        ...(![TEST, PROD].includes(config.app.env) ? { stack: error.stack } : {})
      });
    }

    return res.status(500).json({
      status: 'error',
      statusCode: 500,
      type: 'InternalServerError',
      timestamp: Date.now(),
      message: 'Something went wrong. visit our support team',
      ...(![TEST, PROD].includes(config.app.env) ? { stack: error?.stack } : {})
    });
  }

  static NotFoundHandler(_req:Request, res: Response, _next: NextFunction) {
    return res.status(404).json({
      status: 'error',
      statusCode: 404,
      type: 'NotFoundError',
      timestamp: Date.now(),
      message: 'endpoint not found'
    });
  }

  static routeLogger(req: Request, _res: Response, next: NextFunction) {
    logger.info(`:: ${new Date()} --> ${req.method} ${req.baseUrl} ${req.url}`);
    next();
  }

  static setIPxUserAgent(req: Request, res: Response, next: NextFunction) {
    try {
      res.locals.ip = getClientIp(req);
      res.locals.userAgent = req.get('User-Agent');
      return next();
    } catch (error) {
      next(error)
    }
  }

  static DevLogs(req: Request, _res: Response, next: NextFunction) {
    console.log(`- requesting ${req.method} - ${req.url}`);
    console.log(`- requesting data =  ${JSON.stringify({ body: req.body, query: req.query }, null , 2)}`);
    return next();
  }

  static CORS = cors();
  static Helmet = helmet();
  static RateLimiting = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
  });
}
