import express from "express";
import mongoose from "mongoose";
import authRouter from './routes/auth.route.js'
import dotenv from "dotenv";

dotenv.config();

const app = express()

 app.use(express.json())


mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });




app.listen(3000, () => {
    console.log('Server is running on port 3000');
})



   app.use('/api/auth' , authRouter)

app.use((err, req ,res, next ) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'internal server error';
    return res.status(statusCode.json({
        success : false,
        statusCode,
        message
    }))
})