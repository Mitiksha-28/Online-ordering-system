import express from "express";
import { sequelize } from "@server/database";

const app = express();

app.get("/", async (_req, res) => {
  sequelize.sync();
  console.log(sequelize.models);
  const tables = sequelize.models;
  res.json(Object.keys(tables));
  res.status(200);
});

export { app as tablesRouter };
