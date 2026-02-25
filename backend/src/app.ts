import express from 'express';
import session from 'express-session';
import authRoutes from './routes/authRoutes';
import passkeyRoutes from './routes/passkeyRoutes';
import { errorHandler } from './utils/errorHandler';

const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL, // allow Frontend origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  }),
);

app.use(
  session({
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 5, // 5 minutes for the WebAuthn flow
    },
  }),
);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/auth/passkeys', passkeyRoutes);
app.use(errorHandler);

export default app;
