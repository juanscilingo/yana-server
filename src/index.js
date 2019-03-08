import dotenv from "dotenv";
import express from "express";
import cors from "cors";

dotenv.config();

const { APP_PORT } = process.env;

// EXPRESS SERVER
const app = express();

// HEADER CONFIGURATION
app.disable("x-powered-by");

// ENABLE CORS
app.use(cors({ credentials: true }));

app.listen({ port: APP_PORT }, () =>
  console.log(`Server ready at http://localhost:${APP_PORT}`)
);
