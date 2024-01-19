import app from "./app";
import config from "./config";
import createMongodbConnection from "./db/connection";

const PORT = config.app.port;

createMongodbConnection();

app
  .listen(PORT, () => {
    console.log("- App environment:: ", PORT);
  })
  .on("error", (err: any) => {
    if (err.code === "EADDRINUSE") {
      console.log("Error: address already in use");
    } else {
      console.log(err);
    }
  });
