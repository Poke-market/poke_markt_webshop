import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRegister } from "./useRegister";
import { UserData, ApiErrorData } from "../types/auth";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { processErrorData } from "../utils/errorHandlers";
import { toast } from "react-toastify";
import { getToastResponse, TOAST_KEYS } from "../config/toastResponses";

export const useRegisterForm = (initialState: UserData) => {
  const [formData, setFormData] = useState<UserData>(initialState);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();

  const { handleRegister, isLoading } = useRegister();

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
    toast.info("Registering...");
    setErrors({});

    try {
      const result = await handleRegister(formData);

      if (result.success) {
        const { message, options } = getToastResponse(
          TOAST_KEYS.REGISTER_SUCCESS,
        );
        toast.success(message, options);
        setFormData(initialState);
        void navigate("/shop");
        return;
      }

      const error = result.error;
      const isFetchBaseQueryError = (
        err: unknown,
      ): err is FetchBaseQueryError =>
        typeof err === "object" && err !== null && "status" in err;

      if (!isFetchBaseQueryError(error) || !error.data) {
        const { message, options } = getToastResponse(
          TOAST_KEYS.REGISTER_ERROR,
        );
        toast.error(message, options);
        return;
      }

      const { message, fieldErrors } = processErrorData(
        error.data as ApiErrorData,
      );
      setErrors(fieldErrors);
      const { options } = getToastResponse(TOAST_KEYS.REGISTER_FAIL);
      toast.error(message, options);
    } catch (error) {
      console.error("Unexpected error:", error);
      const { message, options } = getToastResponse(TOAST_KEYS.REGISTER_ERROR);
      toast.error(message, options);
    }
  };

  return {
    formData,
    isLoading,
    errors,
    handleChange,
    handleSubmit,
  };
};

export default useRegisterForm;
