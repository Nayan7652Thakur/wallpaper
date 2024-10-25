import express from "express";
import mongoose from "mongoose";
import authRouter from './routes/auth.route.js';
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

// Define __dirname in ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

app.use(express.json());
app.use(cookieParser());

// Uncomment this if you are using CORS
// app.use(cors({ origin: 'http://localhost:5173' }));

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

// Routes
app.use('/api/auth', authRouter);

app.use(express.static(path.join(__dirname, 'demo', 'dist')));

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
