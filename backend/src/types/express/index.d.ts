import 'express';
import 'express-session';

// to make the file a module and avoid the TypeScript error
export {};

declare global {
  declare namespace Express {
    export interface Request {
      user?: {
        userId: string;
        email?: string;
      };
    }
  }
}

declare module 'express-session' {
  interface SessionData {
    passkeyChallenge?: string;
    userId?: string;
  }
}
