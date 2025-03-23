import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRegister } from "./useRegister";
import { UserData, ApiErrorData } from "../types/auth";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { toast } from "react-toastify";
import { getToastResponse, TOAST_KEYS } from "../config/toastResponses";
import { processErrorData } from "../utils/errorHandlers";

export const useRegisterForm = (initialState: UserData) => {
  const [formData, setFormData] = useState<UserData>(initialState);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [registering, setRegistering] = useState(false);
  const navigate = useNavigate();

  const { handleRegister, isLoading: isApiLoading } = useRegister();

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

    setFormData((prev) => ({ ...prev, [name]: inputValue }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setRegistering(true);

    try {
      const result = await handleRegister(formData);

      if (result.success) {
        setFormData(initialState);

        const { message, options } = getToastResponse(
          TOAST_KEYS.REGISTER_SUCCESS,
        );

        await navigate("/shop");

        setTimeout(() => {
          toast.success(message, options);
        }, 100);

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
        toast.error(
          message || "Registration failed",
          getToastResponse(TOAST_KEYS.REGISTER_FAIL).options,
        );
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      const { message, options } = getToastResponse(TOAST_KEYS.REGISTER_ERROR);
      toast.error(message, options);
    } finally {
      setRegistering(false);
    }
  };

  const isLoading = isApiLoading || registering;

  return {
    formData,
    isLoading,
    errors,
    handleChange,
    handleSubmit,
  };
};

export default useRegisterForm;
