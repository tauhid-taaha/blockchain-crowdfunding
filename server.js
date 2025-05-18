import express from 'express'

import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js'
import blogRoutes from './routes/blogRoutes.js'
import bkashRoutes from './routes/bkashRoutes.js'
import cors from 'cors'

dotenv.config();

connectDB();

const app = express();

// CORS configuration
app.use(cors({
  origin: 'http://localhost:5173', // Vite's default port
  credentials: true
}));

app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/blogs", blogRoutes);
app.use("/api/v1/bkash", bkashRoutes);
app.get('/', (req,res)=>{
    res.send("<h1>Welcome</h1>");
});

const PORT = process.env.PORT || 8080;

app.listen(PORT,()=>{
    console.log(`server running on ${PORT}`);
});