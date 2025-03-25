export interface User {
  _id: string;
  avatar: string;
  city: string;
  email: string;
  firstname: string;
  housenumber: string;
  lastname: string;
  street: string;
  telephone: string;
  wishList: string[];
  zipcode: string;
  isAdmin: boolean;
  isVerified: boolean;
  verificationToken: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}
