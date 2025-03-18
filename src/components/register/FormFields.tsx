import React from "react";
import Input from "../common/Input.tsx";
import { formFields, FormField } from "../../config/formFields";
import { RegisterFormData } from "../../types/apiTypes/auth";

const FormFields = ({
  formData,
  handleChange,
}: {
  formData: RegisterFormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <>
      {formFields.map((field: FormField) => {
        const value = formData[field.name];
        return (
          <div key={field.name}>
            <label>{field.label}:</label>
            <Input
              type={field.type}
              name={field.name}
              value={value !== undefined ? value.toString() : ""}
              onChange={handleChange}
              required={field.required}
            />
          </div>
        );
      })}
    </>
  );
};

export default FormFields;
