export interface GuestModel {
  email: string;
  role: string;
}
export interface KarteiraModel {
  name: string;
  owner: string;
  guests: GuestModel[];
  createdAt: Date;
  updatedAt: Date;
}