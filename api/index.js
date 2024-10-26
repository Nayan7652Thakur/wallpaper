import express from "express";
import mongoose from "mongoose";
import authRouter from './routes/auth.route.js';
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.json());
app.use(cookieParser());

// Serve static files from the 'demo/dist' directory
app.use(express.static(path.join(__dirname, 'demo', 'dist')));

// Authentication routes
app.use('/api/auth', authRouter);

// Handle any other routes and serve index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'demo', 'dist', 'index.html'));
});

// Error-handling middleware
app.use((err, req, res, next) => {
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
