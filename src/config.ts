import dotenv from "dotenv";
import { join } from "path";


export enum AppENV {
  DEV = "development",
  PROD = "production",
  TEST = "test",
}

dotenv.config({
  path: [AppENV.DEV, AppENV.TEST].includes(process.env.APP_ENV?.trim() as AppENV)
    ? join(__dirname, "..", ".env.dev")
    : join(__dirname, "..", ".env.prod"),
});

const config = {
  app: {
    port: +(process.env.PORT || 3001),
    env: process.env.APP_ENV as AppENV
  }
}

export default config;