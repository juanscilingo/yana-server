import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import expressAsyncErrors from "express-async-errors";
import configureRoutes from "./routes";
import configureAuth from "./auth";
import errorHandler from "./errorHandler";

dotenv.config();

const { APP_PORT, DB_HOST, DB_NAME, DB_USER, DB_PASSWORD } = process.env;

(async () => {
  try {
    // DB CONNECTION
    const CONNECTION_STRING = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`;
    await mongoose.connect(CONNECTION_STRING, {
      useNewUrlParser: true
    });

    const app = express();
    app.disable("x-powered-by");
    app.use(cors({ credentials: true }));
    app.use(bodyParser.json());

    configureAuth(app);
    configureRoutes(app);

    app.use(errorHandler);

    app.listen({ port: APP_PORT }, () =>
      console.log(`Server ready at http://localhost:${APP_PORT}`)
    );
  } catch (e) {
    console.error(e);
  }
})();
