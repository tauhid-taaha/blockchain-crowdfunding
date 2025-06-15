import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';           // for resolving upload folder path
import connectDB from './config/db.js';

import authRoutes from './routes/authRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import bkashRoutes from './routes/bkashRoutes.js';
import campaignRoutes from './routes/campaignroute.js';


dotenv.config();
connectDB();

const app = express();
const __dirname = path.resolve();

// CORS configuration
app.use(cors({
  origin: 'https://ashoye.vercel.app',  // Vite frontend URL
  credentials: true
}));

app.use(express.json());
app.use(morgan('dev'));

// Serve uploaded files statically from /uploads URL path
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// API routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/blogs', blogRoutes);
app.use('/api/v1/bkash', bkashRoutes);
app.use('/api/v1/campaigns', campaignRoutes); // note: your campaignRoutes handle '/campaign' endpoints internally

// Root route
app.get('/', (req, res) => {
  res.send('<h1>Welcome</h1>');
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

