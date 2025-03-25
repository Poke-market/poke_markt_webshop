import { useLoginMutation } from "../store/pokemartApi";
import { useAppDispatch } from "../store";
import { clearAuth, setAuth } from "../store/authSlice";
import { LoginCredentials } from "../types/auth";
import { TOAST_KEYS } from "../config";
import { getToastResponse } from "../config";
import { toast } from "react-toastify";

// validation
const validateCredentials = (credentials: LoginCredentials): string | null => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(credentials.email?.trim())) {
    return "Invalid email format";
  }
  if (credentials.password.length < 6) {
    return "Password must be at least 6 characters";
  }
  return null;
};

export const useLogin = (
  onLoginSuccess: () => void,
  onLoginFailure: (message: string) => void,
) => {
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useAppDispatch();

  const handleLogin = async (
    credentials: LoginCredentials,
  ): Promise<boolean> => {
    const validationError = validateCredentials(credentials);
    if (validationError) {
      onLoginFailure(validationError);
      return false;
    }

    const { data: user, error: loginError } = await login(credentials);
    if (loginError) {
      const { message, options } = getToastResponse(TOAST_KEYS.LOGIN_FAIL);
      toast.error(message, options);
      dispatch(clearAuth());
      return false;
    } else {
      dispatch(setAuth(user));
      onLoginSuccess();
      return true;
    }

    // try {
    //   const timeoutPromise = new Promise<never>((_, reject) => {
    //     setTimeout(() => reject(new Error("Request timeout")), 10000);
    //   });

    //   const response = await Promise.race([
    //     login(credentials).unwrap(),
    //     timeoutPromise,
    //   ]);

    //   dispatch(setAuth(response));
    //   onLoginSuccess();
    //   return true;
    // } catch (error) {
    //   let errorMessage = "An unexpected error occurred";
    //   if (error instanceof TypeError && error.message === "Failed to fetch") {
    //     errorMessage = "Network error. Please check your connection.";
    //   } else if (error instanceof Error) {
    //     errorMessage = error.message;
    //   }
    //   onLoginFailure(errorMessage);
    //   return false;
    // }
  };

  return { handleLogin, isLoading };
};
