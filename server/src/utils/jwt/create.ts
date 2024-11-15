import { SignJWT } from "jose";
import { TextEncoder } from "util";

export const createJWT = async (userId: string) => {
  const secret = process.env.AUTH_SECRET;
  if (!secret) {
    throw new Error("AUTH_SECRET environment variable is not set");
  }

  const encoder = new TextEncoder();
  const jwt = await new SignJWT({ userId })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encoder.encode(secret));

  return jwt;
};
