import { Request, Router } from 'express';
import { prisma } from '../lib/prisma';
import bcrypt from 'bcrypt';
import { signToken } from '../utils/jwt';
import { requireAuth } from '../middleware/auth';
import { OAuth2Client } from 'google-auth-library';

const googleClient = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
   "postmessage"
);
const router = Router();

router.get('/', requireAuth, async (req, res) => {
  try {
    const userId = req.user?.userId;

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) return res.sendStatus(404);

    res.json({
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  } catch (err) {
    res.status(500);
  }
});

router.get('/protected', requireAuth, async (req, res) => {
  try {
    const userId = req.user?.userId;
    const user = await prisma.user.findUnique({ where: { id: userId } });
    res.status(200).json(user);
  } catch (err) {
    res.status(500);
  }
});

router.post('/login', async (req, res) => {
  try {
    let { email, password } = req.body;

    email = email?.trim().toLowerCase();
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !user.password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = signToken(user.id);

    res
      .cookie('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
      })
      .json({
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        },
      });
  } catch (err) {
    res.status(500).json({ message: 'Error login' });
  }
});

router.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out' });
});

router.post('/register', async (req, res) => {
  try {
    let { email, firstName, lastName, password } = req.body;

    email = email?.trim().toLowerCase();

    // Validation
    if (!email || email.trim().length === 0)
      return res.status(400).json({ message: 'Email is required' });
    if (!firstName || firstName.trim().length === 0)
      return res.status(400).json({ message: 'First name is required' });
    if (!lastName || lastName.trim().length === 0)
      return res.status(400).json({ message: 'Last name is required' });
    if (!password || password.trim().length === 0)
      return res.status(400).json({ message: 'Password is required' });

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing)
      return res.status(400).json({
        code: 'EMAIL_EXISTS',
        message: 'User with this email already exists',
      });

    const passwordHash = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email,
        firstName,
        lastName,
        password: passwordHash,
      },
    });

    const token = signToken(user.id);

    res
      .cookie('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
      })
      .json({
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        },
      });
  } catch (err) {
    res.status(500).json({ message: 'Error registering new user' });
  }
});

router.post('/google', async (req, res) => {
  try {
    const { code } = req.body; // ID token from frontend

    if (!code) {
      return res.status(400).json({ message: 'Missing authorization code' });
    }

    // Exchange code for token
    const { tokens } = await googleClient.getToken(code);

    if (!tokens.id_token) {
      return res.status(400).json({ message: "No ID token received" });
    }

     // Verify ID token
    const ticket = await googleClient.verifyIdToken({
      idToken: tokens.id_token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload?.email) {
      return res.status(400).json({ message: 'Invalid Google token' });
    }

    const email = payload.email.toLowerCase();
    const googleId = payload.sub;
    const firstName = payload.given_name ?? '';
    const lastName = payload.family_name ?? '';

    // Try find existing user by email
    let user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      // Create new user if not exists
      user = await prisma.user.create({
        data: {
          email,
          firstName,
          lastName,
          googleId,
        },
      });
    } else {
      // If user exists but no googleId -> link account
      if (!user.googleId) {
        user = await prisma.user.update({
          where: { id: user.id },
          data: { googleId },
        });
      } else if (user.googleId !== googleId) {
        return res.status(403).json({ message: 'Google account mismatch' });
      }
    }

    // Issue JWT
    const token = signToken(user.id);

    res
      .cookie('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
      })
      .json({
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        },
      });
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: 'Google authentication failed' });
  }
});

// router;
export default router;
