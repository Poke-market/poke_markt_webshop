export type UserData = {
  avatar: string;
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
  avatar: "",
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

export type ApiErrorData = {
  endpoint: string;
  method: string;
  errors?: [string, string][];
};
export interface AuthResponse {
  user: UserData;
  token: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export type ErrorResponse = {
  status: number;
  data: ApiErrorData;
};
