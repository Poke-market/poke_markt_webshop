import { ToastOptions } from "react-toastify";

export type ToastResponseType = "success" | "error";

export interface ToastResponse {
  message: string;
  options?: ToastOptions;
}

export const toastResponses = {
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
  wishlistNotLoggedIn: {
    message: "You must be logged in to use the wishlist.",
    options: { toastId: "wishlist-not-logged-in" },
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
  WISHLIST_NOT_LOGGED_IN: "wishlistNotLoggedIn",
} as const;
