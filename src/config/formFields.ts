import { RegisterFormData } from "../types/apiTypes/auth";

export type FormField = {
  label: string;
  type: "text" | "email" | "password" | "number";
  name: keyof RegisterFormData;
  required?: boolean;
};

export const formFields: FormField[] = [
  { label: "Email", type: "email", name: "email", required: true },
  { label: "Password", type: "password", name: "password", required: true },
  { label: "First Name", type: "text", name: "firstname", required: true },
  { label: "Last Name", type: "text", name: "lastname", required: true },
  { label: "City", type: "text", name: "city", required: true },
  { label: "Street", type: "text", name: "street", required: true },
  {
    label: "House Number",
    type: "number",
    name: "housenumber",
    required: true,
  },
  { label: "Zip Code", type: "text", name: "zipcode", required: true },
  { label: "Telephone", type: "text", name: "telephone", required: false },
];
