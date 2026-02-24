import 'express';

// to make the file a module and avoid the TypeScript error
export {};

declare global {
  declare namespace Express {
    export interface Request {
      user?: {
        userId: string;
        email?: string;
      }
    }
  }
}
