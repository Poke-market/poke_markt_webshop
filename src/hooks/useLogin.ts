import { useLoginMutation } from "../store/pokemartApi";
import { useAppDispatch } from "../store";
import { setAuth } from "../store/authSlice";
import { LoginCredentials } from "../types/auth";

export const useLogin = (
  onLoginSuccess: () => void,
  onLoginFailure: (message: string) => void,
) => {
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useAppDispatch();

  const handleLogin = async (credentials: LoginCredentials) => {
    try {
      // email format validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(credentials.email?.trim())) {
        onLoginFailure("Invalid email format");
        return false;
      }

      // password length validation
      if (credentials.password.length < 6) {
        onLoginFailure("Password must be at least 6 characters");
        return false;
      }

      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error("Request timeout")), 10000);
      });

      const response = await Promise.race([
        login(credentials).unwrap(),
        timeoutPromise,
      ]);

      dispatch(setAuth(response));
      onLoginSuccess();
      return true;
    } catch (error) {
      if (error instanceof TypeError && error.message === "Failed to fetch") {
        onLoginFailure("Network error. Please check your connection.");
        return false;
      }
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred";
      onLoginFailure(errorMessage);
      return false;
    }
  };

  return { handleLogin, isLoading };
};
