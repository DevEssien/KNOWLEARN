import express from 'express';
import { json, urlencoded } from 'body-parser';
import router  from './routers/user/index';

const app = express();

app.use(json());
app.use(urlencoded({ extended: false}));

app.use(router)

export default app;