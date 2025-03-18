import { apiResponse } from "./response";

export type RegisterFormData = {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  city: string;
  street: string;
  housenumber: string;
  zipcode: string;
  telephone: string;
  isAdmin?: boolean;
};

export type RegisterResponse = {
  token: string;
  user: {
    id: string;
    email: string;
  };
};

export type RegisterApiResponse = apiResponse<RegisterResponse>;
