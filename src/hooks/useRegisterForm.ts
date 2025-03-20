import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRegister } from "./useRegister";
import { UserData } from "../types/auth";
import { TOAST_KEYS, getToastResponse } from "../config/toastResponses";
import { toast } from "react-toastify";

export const useRegisterForm = (initialState: UserData) => {
  const [formData, setFormData] = useState<UserData>(initialState);
  const [statusMessage, setStatusMessage] = useState("");
  const navigate = useNavigate();

  const showToast = (key: keyof typeof TOAST_KEYS) => {
    const { message, options } = getToastResponse(TOAST_KEYS[key]);
    if (key.includes("SUCCESS")) {
      toast.success(message, options);
    } else {
      toast.error(message, options);
    }
  };

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
      const result = await handleRegister(formData);

      if (result.success) {
        showToast("REGISTER_SUCCESS");
        setFormData(initialState);
        void navigate("/shop");
      } else {
        showToast("REGISTER_FAIL");
      }
    } catch (error) {
      showToast("REGISTER_ERROR");
      console.error("Error:", error);
    } finally {
      setStatusMessage("");
    }
  };

  return {
    formData,
    statusMessage,
    isLoading,
    handleChange,
    handleSubmit,
  };
};

export default useRegisterForm;
