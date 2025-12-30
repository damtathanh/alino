export type CreatorId = string;

export type Creator = {
  id: CreatorId;
  userId: string;
  displayName: string;
  bio?: string | null;
  niche?: string | null;
  createdAt?: string;
  updatedAt?: string;
};

