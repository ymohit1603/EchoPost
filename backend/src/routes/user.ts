import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign } from "hono/jwt"; // JWT handling with hono/jwt
import bcrypt from 'bcryptjs';
import { signinInput, signupInput } from "@mohit1033/medium-common";
import { setCookie } from "hono/cookie";

// Utility to calculate expiration time
const generateToken = async (userId: string, secret: string) => {
  const expirationTime = Math.floor(Date.now() / 1000) + (24 * 60 * 60); // 1 day from now
  return await sign({ id: userId, exp: expirationTime }, secret); // Pass 'exp' claim
};

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  }
}>();

// Signup Route
userRouter.post('/signup', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const parsed = signupInput.safeParse(body);

  if (!parsed.success) {
    c.status(400);
    return c.json({ message: "Inputs not correct" });
  }

  const { username, password, name } = parsed.data; // Access the parsed data safely
  if (!name) {
    c.status(400);
    return c.json({ message: "Name is required" });
  }
  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email: username,
        password: hashedPassword,
        name: name,
      },
    });

    const token = await generateToken(user.id, c.env.JWT_SECRET);
    console.log(token);
    c.header('Set-Cookie', `Authorization=${token}; Path=/; HttpOnly`);

    return c.json({ message: "Signup successful" });
  } catch (e) {
    c.status(500);
    return c.json({ error: "Error while signing up" });
  }
});

// Signin Route
userRouter.post('/signin', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const parsed = signinInput.safeParse(body);

  if (!parsed.success) {
    c.status(400);
    return c.json({ message: "Inputs not correct" });
  }

  const { username, password } = parsed.data; // Access the parsed data safely

  try {
    const user = await prisma.user.findUnique({
      where: { email: username },
    });

    if (!user) {
      c.status(403);
      return c.json({ error: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      c.status(403);
      return c.json({ error: "Invalid credentials" });
    }

    const token = await generateToken(user.id, c.env.JWT_SECRET);

    // Set cookie with JWT token
    c.res.headers.set("Set-Cookie", `token=${token}; HttpOnly; Max-Age=86400; Path=/; Secure; SameSite=Strict`);

    return c.json({ message: "Signin successful" });
  } catch (e) {
    c.status(500);
    return c.json({ error: "Error during sign in" });
  }
});