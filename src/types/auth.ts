export type UserData = {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  city: string;
  street: string;
  housenumber: string;
  zipcode: string;
  telephone: string;
  isAdmin: boolean;
};

export const initialUserData: UserData = {
  email: "",
  password: "",
  firstname: "",
  lastname: "",
  city: "",
  street: "",
  housenumber: "",
  zipcode: "",
  telephone: "",
  isAdmin: false,
};
export type RegisterResponse = {
  success: boolean;
  user: UserData;
  token: string;
};
