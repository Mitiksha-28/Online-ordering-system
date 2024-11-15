import express from "express";
import { z } from "zod";
import { Session, User } from "../../database";
import { createJWT } from "../../utils/jwt/create";

const app = express();

app.post("/login", async (req, res) => {
  const schema = z.object({
    email: z.string(),
    password: z.string(),
  });

  const parseResult = schema.safeParse(req.body);

  if (!parseResult.success) {
    res.status(400).json({ error: parseResult.error });
    return;
  }

  const { email, password } = parseResult.data;

  const DBUser = await User.findOne({ where: { email } });
  if (!DBUser) {
    res.status(401).json({ error: "Invalid email or password" });
    return;
  }

  if (!DBUser.verifyPassword(password)) {
    res.status(401).json({ error: "Invalid email or password" });
    return;
  }

  console.log(DBUser.id);

  const jwt = await createJWT(DBUser.id);
  // Find with the user id and if not found, create with jwt
  const [session] = await Session.findOrCreate({ where: { userId: DBUser.id, token: jwt } });
  res.status(200).cookie("session", session.token, { httpOnly: true }).send();
  return;
});

app.post("/register", async (req, res) => {
  const schema = z.object({
    email: z.string(),
    password: z.string(),
  });

  const parseResult = schema.safeParse(req.body);

  if (!parseResult.success) {
    res.status(400).json({ error: parseResult.error });
    return;
  }

  const { email, password } = parseResult.data;

  const DBUser = await User.findOne({ where: { email } });
  if (DBUser) {
    res.status(400).json({ error: "User already exists" });
    return;
  }

  const newUser = await User.create({ email, password });

  const jwt = await createJWT(newUser.id);
  const [session] = await Session.findOrCreate({ where: { userId: newUser.id, token: jwt } });
  res.status(200).cookie("session", session.token, { httpOnly: true }).send();
  return;
});

app.get("/check", async (req, res) => {
  const token = req.cookies.session;
  if (!token) {
    res.status(200).json({ authenticated: false });
    return;
  }

  const session = await Session.findOne({ where: { token } });
  if (!session) {
    res.status(200).json({ authenticated: false });
    return;
  }

  res.status(200).json({ authenticated: true });
  return;
});

export { app as authRouter };
