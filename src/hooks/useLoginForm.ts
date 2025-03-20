import { useState, ChangeEvent } from "react";
import { useLogin } from "./useLogin";

export const useLoginForm = (
  onLoginSuccess: () => void,
  onLoginFailure: () => void,
) => {
  const { handleLogin, isLoading } = useLogin(onLoginSuccess, onLoginFailure);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginFailed, setLoginFailed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginFailed(false);

    const success = await handleLogin({ email, password });
    if (success) {
      setTimeout(onLoginSuccess, 500);
    } else {
      setLoginFailed(true);
      onLoginFailure();
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
    setLoginFailed(false);
  };

  return {
    email,
    password,
    loginFailed,
    isLoading,
    handleChange,
    handleSubmit,
  };
};
