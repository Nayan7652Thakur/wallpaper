import express from "express";
import mongoose from "mongoose";
import authRouter from './routes/auth.route.js';
import dotenv from "dotenv";
import cookieParser from 'cookie-parser'
import path from 'path'

dotenv.config();

const app = express();


mongoose
.connect(process.env.MONGO_URL)
.then(() => {
  console.log("Connected to MongoDB");
})
.catch((err) => {
  console.log(err);
});

const __direname = path.resolve()

app.use(express.json());

app.use(cookieParser())

// app.use(cors({ origin: 'http://localhost:5173' })); // Allow requests from your frontend
  

app.use('/api/auth', authRouter);


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

// Routes

app.use(express.static(path.join(__direname, '/demo/dist'))) 

 app.get('*',  (req, res) => {
res.sendFile(path.join(__dirname, 'demo', 'dist' , 'index.html'))
 })

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