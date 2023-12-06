import express from "express";
import { json, urlencoded } from "body-parser";
import router from "./routers/user/index";
import GeneralMiddleware from "./middleware/general";

const {
  CORS,
  DevLogs, 
  ErrorHandler,
  Helmet,
  NotFoundHandler,
  RateLimiting,
} = GeneralMiddleware;

const app = express();

app.set('trust proxy', 1);

app.use(json());
app.use(urlencoded({ extended: false }));

app.use(RateLimiting);
app.use(Helmet)
app.use(CORS)
app.use(DevLogs)

app.use(router);

// const appRouterStackLayer = app._router.stack.filter((layer: any) => layer.name === 'router');
// const routes = appRouterStackLayer[0].handle.stack;
// console.log(routes);

app.use(NotFoundHandler);
app.use(ErrorHandler);

export default app;
