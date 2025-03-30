export type GuestModel = {
  email: string;
  role: string;
}
export type KarteiraModel = {
  name: string;
  owner: string;
  guests: GuestModel[];
  createdAt: Date;
  updatedAt: Date;
}
