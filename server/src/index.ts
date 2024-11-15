import express, { NextFunction, Request, Response } from "express";
import { sequelize } from "./database";
import { apiRouter } from "./api";
import bodyParser from "body-parser";
import { config } from "dotenv";
import path from "path";
import cookieParser from "cookie-parser";

config({ path: path.join(import.meta.dirname, "../.env") });

const app = express();
const jsonParser = bodyParser.json();
app.use(cookieParser());
app.use("/api", jsonParser, apiRouter);

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});

export { sequelize };
