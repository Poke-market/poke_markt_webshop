import { useState } from "react";
import { validateField } from "../utils/validation";

// formstate hook to manage form data and errors
export const useFormState = <T extends Record<string, any>>(
  initialState: T,
) => {
  const [formData, setFormData] = useState<T>(initialState);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Handle form field changes
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value, type } = e.target;
    const inputValue =
      type === "checkbox" && "checked" in e.target
        ? (e.target as HTMLInputElement).checked
        : value;

    // updating the form data
    setFormData((prev) => ({ ...prev, [name]: inputValue }));

    // real time validation
    const errorMessage = validateField(name, inputValue);
    setErrors((prev) => ({ ...prev, [name]: errorMessage }));
  };

  return {
    formData,
    errors,
    handleChange,
    setFormData,
    setErrors,
  };
};
