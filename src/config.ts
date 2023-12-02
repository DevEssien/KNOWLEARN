import dotenv from "dotenv";
import { join } from "path";

import { TConfig } from './types'

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


const config: TConfig<any> = {
  app: {
    port: +(process.env.PORT || 3001),
    env: process.env.APP_ENV as AppENV
  },
  db: {
    uri: process.env.LOCAL_DB_URI
  }
}


export default config;