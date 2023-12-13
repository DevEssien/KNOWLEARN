import dotenv from "dotenv";
import { join } from "path";

type TConfig = {
  app: {
    port: number;
    env: string;
    saltRounds: number;
    secret: string;
  };
  db: {
    uri: string;
  };
}

export enum AppENV {
  DEV = "development",
  PROD = "production",
  TEST = "test",
  LOCAL = 'local'
}

dotenv.config({
  path: [AppENV.DEV, AppENV.TEST].includes(process.env.APP_ENV?.trim() as AppENV)
    ? join(__dirname, "..", ".env.dev")
    : join(__dirname, "..", ".env.prod"),
});


const config: TConfig = {
  app: {
    port: +(process.env.PORT || 3001),
    env: process.env.APP_ENV as AppENV,
    saltRounds: +process.env.SALT_ROUNDS!,
    secret: process.env.USER_SECRET!
  },
  db: {
    uri: process.env.LOCAL_DB_URI!
  }
}

export default config;