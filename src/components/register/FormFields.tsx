import React from "react";
import Input from "../common/Input.tsx";
import { formFields, FormField } from "../../config/formFields";

const FormFields = ({
  formData,
  handleChange,
}: {
  formData: Record<string, string>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <>
      {/* Iterating over formFields array in formFields.ts to generate input fields */}
      {formFields.map((field: FormField) => (
        <div key={field.name}>
          <label>{field.label}:</label>
          <Input
            type={field.type}
            name={field.name}
            value={formData[field.name]}
            onChange={handleChange}
            required={field.required}
          />
        </div>
      ))}
    </>
  );
};

export default FormFields;
