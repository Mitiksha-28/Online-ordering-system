import express from "express";
import { menuItemRouter } from "./menu";
import { authRouter } from "./auth";
import { ordersRouter } from "./orders";

const app = express();

app.use("/menu", menuItemRouter);
app.use("/auth", authRouter);
app.use("/orders", ordersRouter);

export { app as apiRouter };
