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

// export interface ApiErrorData {
//   data?: {
//     endpoint?: string;
//     method?: string;
//     errors?: [string, string][];
//     message?: string;
//     item?: unknown;
//   };
//   status?: string;
//   message?: string;
// }

export type ErrorResponse = {
  status: number;
  data: ApiErrorData;
};
