import { Router } from 'express';
import {
  generateRegistrationOptions,
  verifyRegistrationResponse,
  generateAuthenticationOptions,
  verifyAuthenticationResponse,
} from '@simplewebauthn/server';
import { prisma } from '../lib/prisma';
import { requireAuth } from '../middleware/auth';
import { signToken } from '../utils/jwt';
import { getPasskeyName } from '../utils/passkeys';
import { asyncHandler } from '../middleware/asyncHandler';

const RP_NAME = process.env.RP_NAME!;
const RP_ID = process.env.RP_ID!;
const ORIGIN = process.env.FRONTEND_URL!;

const router = Router();

// GET /api/auth/passkeys - Get list of users passkeys
router.get(
  '/',
  requireAuth,
  asyncHandler(async (req, res) => {
    if (!req.user) {
      return res
        .status(400)
        .json({ message: 'User not found or not authenticated' });
    }

    const passkeys = await prisma.passkey.findMany({
      where: { userId: req.user.userId },
      select: {
        id: true,
        name: true,
        deviceType: true,
        backedUp: true,
        createdAt: true,
        lastUsedAt: true,
        transports: true,
      },
    });
    res.json({ passkeys });
  }),
);

// DELETE /api/auth/passkeys/:id - Delete specific passkey of user
router.delete(
  '/:id',
  requireAuth,
  asyncHandler(async (req, res) => {
    const { id } = req.params as { id: string };
    if (!req.user) {
      return res
        .status(400)
        .json({ message: 'User not found or not authenticated' });
    }

    const passkey = await prisma.passkey.findUnique({
      where: { id },
    });

    // Make sure the passkey belongs to the requesting user
    if (!passkey || passkey.userId !== req.user.userId) {
      return res.status(404).json({ error: 'Passkey not found' });
    }

    await prisma.passkey.delete({ where: { id } });
    res.json({ success: true });
  }),
);

/*
  ##############################################################
    PASSKEY REGISTRATION
  ##############################################################
  */

// POST /api/auth/passkeys/register/options - 1. Generate options (user must already be logged in)
router.post(
  '/register/options',
  requireAuth,
  asyncHandler(async (req, res) => {
    if (!req.user) {
      return res
        .status(400)
        .json({ message: 'User not found or not authenticated' });
    }

    const user = await prisma.user.findUniqueOrThrow({
      where: { id: req.user.userId },
      include: { passkeys: true },
    });

    const options = await generateRegistrationOptions({
      rpName: RP_NAME,
      rpID: RP_ID,
      userName: user.email,
      userDisplayName: `${user.firstName} ${user.lastName}`,
      // Prevent re-registering existing passkeys
      excludeCredentials: user.passkeys.map((p) => ({
        id: p.credentialId,
        transports: p.transports as AuthenticatorTransport[],
      })),
      authenticatorSelection: {
        residentKey: 'preferred',
        userVerification: 'preferred',
      },
    });

    // Store challenge in session
    req.session.passkeyChallenge = options.challenge;

    res.json(options);
  }),
);

// POST /api/auth/passkeys/register/verify - 2. Verify and save
router.post(
  '/register/verify',
  requireAuth,
  asyncHandler(async (req, res) => {
    const user = req.user;

    if (!user?.userId) {
      return res
        .status(400)
        .json({ message: 'User not found or not authenticated' });
    }

    const expectedChallenge = req.session.passkeyChallenge;
    if (!expectedChallenge)
      return res.status(400).json({ error: 'No challenge' });

    let verification;
    try {
      verification = await verifyRegistrationResponse({
        response: req.body,
        expectedChallenge,
        expectedOrigin: ORIGIN,
        expectedRPID: RP_ID,
      });
    } catch (e) {
      return res.status(400).json({ error: (e as Error).message });
    }

    if (!verification.verified || !verification.registrationInfo) {
      return res.status(400).json({ error: 'Verification failed' });
    }

    const { credential, credentialDeviceType, credentialBackedUp } =
      verification.registrationInfo;

    const passkeyName = getPasskeyName(
      req.body.response.transports ?? [],
      req.body.authenticatorAttachment,
      req.headers['user-agent'] ?? '',
    );

    const newPasskey = await prisma.passkey.create({
      data: {
        userId: user.userId,
        name: passkeyName,
        credentialId: credential.id,
        publicKey: Buffer.from(credential.publicKey),
        counter: credential.counter,
        deviceType: credentialDeviceType,
        backedUp: credentialBackedUp,
        transports: req.body.response.transports ?? [],
      },
      select: {
        id: true,
        name: true,
        deviceType: true,
        backedUp: true,
        createdAt: true,
        lastUsedAt: true,
        transports: true,
      },
    });

    delete req.session.passkeyChallenge;
    res.json({
      verified: true,
      passkey: newPasskey,
    });
  }),
);

/*
  ##############################################################
    PASSKEY AUTHENTICATION
  ##############################################################
  */

// POST /api/auth/passkeys/login/options - 1. Generate options for login
router.post(
  '/login/options',
  asyncHandler(async (req, res) => {
    const options = await generateAuthenticationOptions({
      rpID: RP_ID,
      userVerification: 'preferred',
    });

    req.session.passkeyChallenge = options.challenge;
    res.json(options);
  }),
);

// POST /api/auth/passkeys/login/verify - 2. Verify and issue JWT
router.post(
  '/login/verify',
  asyncHandler(async (req, res) => {
    const expectedChallenge = req.session.passkeyChallenge;
    if (!expectedChallenge)
      return res.status(400).json({ error: 'No challenge' });

    const passkey = await prisma.passkey.findUnique({
      where: { credentialId: req.body.id },
      include: { user: true },
    });

    if (!passkey) return res.status(400).json({ error: 'Passkey not found' });

    let verification;
    try {
      verification = await verifyAuthenticationResponse({
        response: req.body,
        expectedChallenge,
        expectedOrigin: ORIGIN,
        expectedRPID: RP_ID,
        credential: {
          id: passkey.credentialId,
          publicKey: new Uint8Array(passkey.publicKey),
          counter: Number(passkey.counter),
          transports: passkey.transports as AuthenticatorTransport[],
        },
      });
    } catch (e) {
      return res.status(400).json({ error: (e as Error).message });
    }

    if (!verification.verified)
      return res.status(400).json({ error: 'Verification failed' });

    // Update counter (replay attack protection)
    const updatedPasskey = await prisma.passkey.update({
      where: { id: passkey.id },
      data: {
        counter: verification.authenticationInfo.newCounter,
        lastUsedAt: new Date(),
      },
      include: { user: true },
    });

    delete req.session.passkeyChallenge;

    // Issue JWT
    const user = updatedPasskey.user;
    const token = signToken(user.id);

    req.session.userId = passkey.user.id;
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
  }),
);

export default router;
