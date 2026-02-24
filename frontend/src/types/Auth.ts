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
