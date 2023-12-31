import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import Debug from "debug";

const debug = Debug("app");

const requiredEnvVariables = ["PORT", "MONGODB_URL"];
for (const variable of requiredEnvVariables) {
  if (!(variable in process.env)) {
    debug(
      `Missing environment variable '${variable}'. Make sure to configure the .env file correctly.`,
    );
    process.exit(1);
  }
}

connectToDb().catch((err) => debug(err));
async function connectToDb() {
  debug("Attempting to connect to database...");
  await mongoose.connect(process.env.MONGODB_URL as string);
  debug("Successfully connected to database!");
}

const app = express();
const port = parseInt(process.env.PORT as string, 10);

app.listen(port, () => {
  debug(`Listening on port ${port}`);
});
