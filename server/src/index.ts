import express from "express";
import { sequelize } from "./database";
import { apiRouter } from "./api";
import bodyParser from "body-parser";

const app = express();
const jsonParser = bodyParser.json();

app.get("/", (_req, res) => {
  res.send("Hello World");
});

app.use("/api", jsonParser, apiRouter);

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
export { sequelize };
