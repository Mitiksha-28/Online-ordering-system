import { Order, Session } from "@server/database";
import express from "express";
import { z } from "zod";

const app = express();

const orderSchema = z.object({
  name: z.string(),
  price: z.number(),
  quantity: z.number(),
  total: z.number(),
});

app.post("/", async (req, res) => {
  // Check auth
  const token = req.cookies.session;
  // Find the session
  const session = await Session.findOne({ where: { token } });
  if (!session) {
    res.status(301).redirect("/login");
    return;
  }

  // Create the order
  const body = req.body;
  const parseResult = orderSchema.safeParse(body);
  if (!parseResult.success) {
    res.status(400).json({ error: parseResult.error });
    return;
  }

  const newOrder = await Order.create({
    userId: session.userId,
    ...parseResult.data,
  }).catch(console.error);

  res.status(201).json(newOrder);
});

app.get("/", async (req, res) => {
  // Check auth
  const token = req.cookies.session;
  // Find the session
  const session = await Session.findOne({ where: { token } });
  if (!session) {
    res.status(301).redirect("/login");
    return;
  }

  // Find the orders
  const orders = await Order.findAll({ where: { userId: session.userId } });
  res.json(orders);
});

export { app as ordersRouter };
