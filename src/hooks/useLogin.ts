import { useLoginMutation } from "../store/pokemartApi";

type LoginCallback = () => void;

export const useLogin = (
  onLoginSuccess: LoginCallback,
  onLoginFailure: LoginCallback,
) => {
  const [login, { isLoading }] = useLoginMutation();

  const handleLogin = async (credentials: {
    email: string;
    password: string;
  }) => {
    try {
      const response = await login(credentials).unwrap();
      console.log("Login successful:", response);
      onLoginSuccess();
      return true;
    } catch (error) {
      console.error("Login failed:", error);
      onLoginFailure();
      return false;
    }
  };

  return { handleLogin, isLoading };
};
