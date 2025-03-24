import { useState } from "react";
import { useLogin } from "./useLogin";
import { TOAST_KEYS, getToastResponse } from "../config";
import { toast } from "react-toastify";

export const useLoginForm = (onSuccess: () => void) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  const showToast = (key: keyof typeof TOAST_KEYS) => {
    const { message, options } = getToastResponse(TOAST_KEYS[key]);
    if (key.includes("SUCCESS")) {
      toast.success(message, options); // Show success toast
    } else {
      toast.error(message, options); // Show error toast
    }
  };

  const { handleLogin, isLoading } = useLogin(
    () => {
      showToast("LOGIN_SUCCESS"); // Show success toast on login
      setEmail("");
      setPassword("");
      onSuccess();
    },
    () => showToast("LOGIN_FAIL"), // Show error toast on failure
  );

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage("Logging in...");

    try {
      await handleLogin({ email, password });
    } catch (error) {
      showToast("LOGIN_ERROR"); // Show error toast on exception
      console.error("Error:", error);
    } finally {
      setStatusMessage("");
    }
  };

  return {
    email,
    password,
    statusMessage,
    isLoading,
    handleChange,
    handleSubmit,
  };
};
