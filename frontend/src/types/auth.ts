export type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
};

export type NewUser = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
};

export type Passkey = {
  id: string;
  name: string;
  deviceType: string;
  backedUp: boolean;
  createdAt: string;
  lastUsedAt: string | null;
  transports: string[];
};
