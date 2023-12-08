import express from "express";
import { json, urlencoded } from "body-parser";
import userRouter from "./routers/user/index";
import apiDocRouter from './routers/docs/index';
import GeneralMiddleware from "./middleware/general";

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

app.use('/api/v1', userRouter);
app.use(apiDocRouter);

app.use(NotFoundHandler);
app.use(ErrorHandler);

export default app;
