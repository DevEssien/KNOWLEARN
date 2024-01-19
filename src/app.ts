import express from "express";
import { json, urlencoded } from "body-parser";
// import userRouter from "./routers/user/index";
import apiDocRouter from './routers/docs/index';
import GeneralMiddleware from "./middleware/general";
import { createRouter } from './routers/user/registerRoutes';
// import { faker} from '@faker-js/faker';

const {
  CORS,
  DevLogs, 
  ErrorHandler,
  Helmet,
  NotFoundHandler,
  RateLimiting,
  // routeLogger
} = GeneralMiddleware;

const app = express();

app.set('trust proxy', 1);

app.use(json());
app.use(urlencoded({ extended: false }));

app.use(RateLimiting);
app.use(Helmet)
app.use(CORS)
app.use(DevLogs)
// app.use(routeLogger);

export const apiBase = '/api/v1'

const userRouter = createRouter();
app.use(apiBase, userRouter);

// app.use(apiBase, userRouter);
app.use(apiDocRouter);

app.use(NotFoundHandler);
app.use(ErrorHandler);

// const name = faker.internet.email();
// console.log(name)


export default app;
