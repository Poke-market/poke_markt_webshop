import { FormField } from "../components/common/Form";

// Fields that can be reused
export const emailField: FormField = {
  label: "Email address",
  type: "email",
  name: "email",
  required: true,
};

export const passwordField: FormField = {
  label: "Password",
  type: "password",
  name: "password",
  required: true,
};

// Register fields
export const registerFields: FormField[] = [
  emailField,
  passwordField,
  { label: "First Name", type: "text", name: "firstname", required: true },
  { label: "Last Name", type: "text", name: "lastname", required: true },
  { label: "City", type: "text", name: "city", required: true },
  { label: "Street", type: "text", name: "street", required: true },
  { label: "House Number", type: "text", name: "housenumber", required: true },
  { label: "Zip Code", type: "text", name: "zipcode", required: true },
  { label: "Telephone", type: "tel", name: "telephone", required: true },
  // { label: "Register as Admin", type: "checkbox", name: "isAdmin" },
];

// Login fields
export const loginFields: FormField[] = [emailField, passwordField];
