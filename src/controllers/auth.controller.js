import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv/config";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return {
        status: 400,
        message: "Email and password are required",
      };
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
    console.error("Error registering user:", error);
    return {
      status: 500,
      message: "Internal server error",
    };
  }
};
