import { ToastOptions } from "react-toastify";

export type ToastResponseType = "success" | "error";

export interface ToastResponse {
  message: string;
  options?: ToastOptions;
}

export const toastResponses = {
  // Register responses
  registerSuccess: {
    message: "Registration successful!",
    options: { toastId: "register-success" },
  },
  registerFail: {
    message: "Registration failed. User might already exist.",
    options: { toastId: "register-fail" },
  },
  registerError: {
    message: "An error occurred during registration.",
    options: { toastId: "register-error" },
  },
  // Login responses
  loginSuccess: {
    message: "Login successful! Welcome back.",
    options: { toastId: "login-success" },
  },
  loginFail: {
    message: "Invalid email or password.",
    options: { toastId: "login-fail" },
  },
  loginError: {
    message: "An error occurred during login.",
    options: { toastId: "login-error" },
  },
} as const;

export const getToastResponse = (
  key: keyof typeof toastResponses,
  fallbackMessage: string = "Something went wrong.",
): ToastResponse => {
  return toastResponses[key] || { message: fallbackMessage };
};

export const TOAST_KEYS = {
  REGISTER_SUCCESS: "registerSuccess",
  REGISTER_FAIL: "registerFail",
  REGISTER_ERROR: "registerError",
  LOGIN_SUCCESS: "loginSuccess",
  LOGIN_FAIL: "loginFail",
  LOGIN_ERROR: "loginError",
} as const;
