import express from 'express';
import authRoutes from './routes/authRoutes';

const app = express();
const cors = require('cors');
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL, // allow Frontend origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  }),
);

// Routes
app.use('/api/auth', authRoutes);

export default app;
