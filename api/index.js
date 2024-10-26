import express from "express";
import mongoose from "mongoose";
import authRouter from './routes/auth.route.js';
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import path, { dirname } from 'path';
// Uncomment the following line if you want to enable CORS
import cors from 'cors';

dotenv.config();

const app = express();

// Uncomment the following line to use CORS if necessary
app.use(cors());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// Middleware
app.use(express.json());
app.use(cookieParser());

// Serve static files from the 'demo/dist' directory
const distPath = path.join(dirname(new URL(import.meta.url).pathname), 'demo', 'dist');
app.use(express.static(distPath));

// Authentication routes
app.use('/api/auth', authRouter);

// Handle any other routes and serve index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

// Error-handling middleware
app.use((err, req, res, next) => {
  console.error("Error occurred:", err); // Log the error details
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal server error';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

// Start the server
const PORT = process.env.PORT || 3000; // Use PORT from environment variables or fallback to 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
