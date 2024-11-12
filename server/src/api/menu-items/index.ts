import express from "express";
import { createItemRouter } from "./create";

const app = express();

app.use("/create", createItemRouter);

export { app as menuItemRouter };
