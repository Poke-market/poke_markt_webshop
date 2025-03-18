import { RegisterFormData } from "../types/apiTypes/auth";

export const initialRegisterForm: RegisterFormData = {
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
