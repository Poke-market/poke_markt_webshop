import { useNavigate } from "react-router-dom";
import { useRegister } from "./useRegister";
import { UserData, ApiErrorData } from "../types/auth";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { showToast } from "../utils/toastUtils";
import { processErrorData } from "../utils/errorHandlers";
import { useFormState } from "./useFormState.ts";
import { validateField } from "../utils/validation.ts";
import { useState } from "react";

export const useRegisterForm = (initialState: UserData) => {
  const navigate = useNavigate();
  const { formData, errors, handleChange, setFormData, setErrors } =
    useFormState<UserData>(initialState);
  const [isRegistering, setIsRegistering] = useState(false);
  const { handleRegister, isLoading: isApiLoading } = useRegister();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields before submitting
    const newErrors: Record<string, string> = {};
    Object.entries(formData).forEach(([name, value]) => {
      const errorMessage = validateField(name, value);
      if (errorMessage) {
        newErrors[name] = errorMessage;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsRegistering(true);

    try {
      const result = await handleRegister(formData);

      if (result.success) {
        setFormData(initialState);
        showToast("REGISTER_SUCCESS");

        // Navigate to the shop page after a short delay
        setTimeout(() => navigate("/shop"), 100);
        return;
      }

      if (result.error) {
        const error = result.error as FetchBaseQueryError;
        const errorData: ApiErrorData = {
          endpoint: (error.data as any)?.endpoint || "/api/auth/register",
          method: (error.data as any)?.method || "POST",
          errors: (error.data as any)?.errors,
        };
        const { message, fieldErrors } = processErrorData(errorData);

        setErrors(fieldErrors);
        showToast(message ? "REGISTER_FAIL" : "REGISTER_ERROR");
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      showToast("REGISTER_ERROR");
    } finally {
      setIsRegistering(false);
    }
  };

  const isLoading = isApiLoading || isRegistering;

  return {
    formData,
    isLoading,
    errors,
    handleChange,
    handleSubmit,
  };
};

export default useRegisterForm;
