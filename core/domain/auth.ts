export type UserId = string;

export type User = {
  id: UserId;
  email?: string | null;
  name?: string | null;
};

export type Session = {
  user: User;
  accessToken?: string;
  expiresAt?: string;
};
