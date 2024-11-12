import express from "express";
import { tablesRouter } from "./tables";
import { menuItemRouter } from "./menu-items";

const app = express();

app.use("/tables", tablesRouter);
app.use("/menu-items", menuItemRouter);

export { app as apiRouter };
