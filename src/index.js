import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import session from "express-session";
import connectMongo from "connect-mongo";
import configureRoutes from "./routes";

dotenv.config();

const {
  APP_PORT,
  NODE_ENV,
  DB_HOST,
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  SESSION_LIFETIME = 1000 * 60 * 60 * 2, // 2 hours
  SESSION_NAME,
  SESSION_SECRET
} = process.env;
const IN_PROD = NODE_ENV === "production";

(async () => {
  try {
    // DB CONNECTION
    const CONNECTION_STRING = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`;

    console.log(`Attempting to connect to MongoDB: ${CONNECTION_STRING}`);
    await mongoose.connect(CONNECTION_STRING, {
      useNewUrlParser: true
    });

    // EXPRESS SERVER
    const app = express();

    // HEADER CONFIGURATION
    app.disable("x-powered-by");

    // SESSION
    const MongoStore = connectMongo(session);
    app.use(
      session({
        store: new MongoStore({ mongooseConnection: mongoose.connection }),
        name: SESSION_NAME,
        secret: SESSION_SECRET,
        resave: true,
        rolling: true,
        saveUninitialized: false,
        cookie: {
          maxAge: parseInt(SESSION_LIFETIME),
          sameSite: true,
          secure: IN_PROD
        }
      })
    );

    // MIDDLEWARE
    app.use(cors({ credentials: true }));
    app.use(bodyParser.json());

    // ROUTES
    configureRoutes(app);

    app.listen({ port: APP_PORT }, () =>
      console.log(`Server ready at http://localhost:${APP_PORT}`)
    );
  } catch (e) {
    console.error(e);
  }
})();
