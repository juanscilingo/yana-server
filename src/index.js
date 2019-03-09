import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import configureRoutes from "./routes";

dotenv.config();

const { APP_PORT } = process.env;

// EXPRESS SERVER
const app = express();

// HEADER CONFIGURATION
app.disable("x-powered-by");

// MIDDLEWARE
app.use(cors({ credentials: true }));
app.use(bodyParser.json());

// ROUTES
configureRoutes(app);

app.listen({ port: APP_PORT }, () =>
  console.log(`Server ready at http://localhost:${APP_PORT}`)
);
