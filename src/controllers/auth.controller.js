import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

dotenv.config()

const prisma = new PrismaClient();

export const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: "Email and password are required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email: email,
        password: hashedPassword,
      },
    });

    res.status(201).json({
      message: "User registered successfully",
    })
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: email}
    })

    if(!user) {
      return res.status(404).json({ message: "User not found"})
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const secret = process.env.JWT_SECRET_KEY;

    console.log(`Byte length: ${Buffer.byteLength(secret, 'utf8') /2} bytes`);

    const payload = {
      userId: user.id,
      createdAt: user.createdAt,
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      algorithm: "HS256",
      expiresIn: "1h",
    })

    if (!token) {
      return res.status(500).json({ message: "Failed to generate token" });
    }

    return res.status(200).json({
      message: "Login successful",
      token: token,
      user: {
        id: user.id,
        email: user.email,
        createdAt: user.createdAt
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
}