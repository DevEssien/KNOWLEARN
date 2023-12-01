import dotenv from "dotenv";
import { join } from "path";

export enum AppENV {
  DEV = "development",
  PROD = "production",
  TEST = "test",
}

dotenv.config({
  path: [AppENV.DEV, AppENV.TEST].includes(process.env.APP_ENV as AppENV)
    ? join(__dirname, "..", ".env.dev")
    : join(__dirname, "..", ".env"),
});

console.log('- App environment:: ', process.env.APP_ENV);

