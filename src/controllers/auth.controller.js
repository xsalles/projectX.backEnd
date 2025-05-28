import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv/config";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export const register = async (email, password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email: email,
        password: hashedPassword,
      },
    });

    return {
      status: 201,
      message: "User registered successfully",
        user: {
            id: user.id,
            email: user.email,
        },
    };
  } catch (error) {
    console.error("Error registering user:", error);
    return {
      status: 500,
      message: "Internal server error",
    };
  }
};
