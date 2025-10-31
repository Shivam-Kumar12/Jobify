import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import User from "./models/UserModel.js";
import { hashPassword } from "./utils/passwordUtils.js";

try {
  await mongoose.connect(process.env.MONGO_URL);
  const user = await User.findOne({ email: "test@test.com" });
  if (user) {
    console.log("Test user already exists");
    process.exit(0);
  }
  const hashedPassword = await hashPassword("secret123");
  await User.create({
    name: "Test User",
    email: "test@test.com",
    password: hashedPassword,
    lastName: "Demo",
    location: "Test City",
  });
  console.log("Test user created successfully");
  process.exit(0);
} catch (error) {
  console.log(error);
  process.exit(1);
}
