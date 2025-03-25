import { ToastOptions } from "react-toastify";

export type ToastResponseType = "success" | "error";

export interface ToastResponse {
  message: string;
  options?: ToastOptions;
}

const defaultToastOptions: ToastOptions = {
  position: "top-right",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: "light",
};

export const toastResponses = {
  // Register responses
  registerSuccess: {
    message: "Registration successful!",
    options: { ...defaultToastOptions, toastId: "register-success" },
  },
  registerFail: {
    message: "Registration failed. User might already exist.",
    options: { ...defaultToastOptions, toastId: "register-fail" },
  },
  registerError: {
    message: "An error occurred during registration.",
    options: { ...defaultToastOptions, toastId: "register-error" },
  },
  // Login responses
  loginSuccess: {
    message: "Login successful! Welcome back.",
    options: { ...defaultToastOptions, toastId: "login-success" },
  },
  loginFail: {
    message: "Invalid email or password.",
    options: { ...defaultToastOptions, toastId: "login-fail" },
  },
  loginError: {
    message: "An error occurred during login.",
    options: { ...defaultToastOptions, toastId: "login-error" },
  },
  // Logout responses
  logoutSuccess: {
    message: "You have been successfully logged out.",
    options: { ...defaultToastOptions, toastId: "logout-success" },
  },
  wishlistNotLoggedIn: {
    message: "You must be logged in to use the wishlist.",
    options: { toastId: "wishlist-not-logged-in" },
  },
} as const;

export const getToastResponse = (
  key: keyof typeof toastResponses,
  fallbackMessage: string = "Something went wrong.",
): ToastResponse => {
  const response = toastResponses[key];
  return {
    message: response?.message || fallbackMessage,
    options: response?.options || defaultToastOptions,
  };
};

export const TOAST_KEYS = {
  REGISTER_SUCCESS: "registerSuccess",
  REGISTER_FAIL: "registerFail",
  REGISTER_ERROR: "registerError",
  WISHLIST_NOT_LOGGED_IN: "wishlistNotLoggedIn",
  LOGIN_SUCCESS: "loginSuccess",
  LOGIN_FAIL: "loginFail",
  LOGIN_ERROR: "loginError",
  LOGOUT_SUCCESS: "logoutSuccess",
} as const;
