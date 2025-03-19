import { useState } from "react";
import useRegister from "./useRegister.ts";
import { UserData } from "../types/auth.ts";
import { TOAST_KEYS } from "../config/toastResponses.ts";

export const useRegisterForm = (initialState: UserData) => {
  const [formData, setFormData] = useState<UserData>(initialState);
  const [statusMessage, setStatusMessage] = useState("");
  const [toastResponse, setToastResponse] = useState<
    { key: string; type: "success" | "error" } | undefined
  >();
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

    setFormData((prev) => ({
      ...prev,
      [name]: inputValue,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage("Registering...");

    try {
      const registrationSuccess = await handleRegister(formData);

      if (registrationSuccess) {
        setToastResponse({ key: TOAST_KEYS.REGISTER_SUCCESS, type: "success" });
        setFormData(initialState);
      } else {
        setToastResponse({ key: TOAST_KEYS.REGISTER_FAIL, type: "error" });
      }
    } catch (error) {
      setToastResponse({ key: TOAST_KEYS.REGISTER_ERROR, type: "error" });
      console.error("Error:", error);
    } finally {
      setStatusMessage("");
    }
  };

  return {
    formData,
    statusMessage,
    toastResponse,
    isLoading,
    handleChange,
    handleSubmit,
  };
};
