import 'express-async-errors';
import * as dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import cloudinary from "cloudinary";
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';
import { authenticateUser } from "./middleware/authMiddleWare.js";
import jobRoutes from "./router/jobRoutes.js";
import authRouter from "./router/authRouter.js";
import userRouter from "./router/userRouter.js"
import companyRouter from "./router/companyRouter.js"
import companyJobRouter from "./router/companyJobRoutes.js";


// Load environment variables from .env file
dotenv.config();

// Create Express app
const app = express();

// Middleware
if (process.env.NODE_ENV === 'development') {
  // Logging middleware for development environment
  app.use(morgan('dev'));
}
app.use(cookieParser())
app.use(express.json());

// Serve static files from the public directory
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.resolve(__dirname, "./public")));

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Routes
app.get("/api/v1/test", (req, res) => {
  res.json({ msg: "test route" });
});

// Mounting routers
app.use('/api/v1/jobs', authenticateUser, jobRoutes);
app.use('/api/v1/users', authenticateUser, userRouter);
app.use('/api/v1/company', companyRouter);
app.use('/api/v1/company-jobs', companyJobRouter);
app.use('/api/v1/auth', authRouter);

// Serve index.html for any other routes
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, "./public", 'index.html'));
});

// 404 Route
app.use('*', (req, res) => {
  res.status(404).json({ msg: 'Not found' });
});

// Error handling middleware
app.use(errorHandlerMiddleware);

// Connect to MongoDB and start server
const port = process.env.PORT || 5100;
try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`server running on PORT ${port}....`);
  });
} catch (error) {
  console.error("Error:", error);
  process.exit(1);
}
