import { toast } from "react-toastify";
import { getToastResponse, TOAST_KEYS } from "../config";

export const showToast = (key: keyof typeof TOAST_KEYS) => {
  const { message, options } = getToastResponse(TOAST_KEYS[key]);
  if (key.includes("SUCCESS")) {
    toast.success(message, options);
  } else {
    toast.error(message, options);
  }
};
