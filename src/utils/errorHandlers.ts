import { ApiErrorData } from "../types/auth";

export const processErrorData = (errorData: ApiErrorData) => {
  if (!errorData.data?.errors || !Array.isArray(errorData.data.errors)) {
    return {
      message: errorData.message,
      fieldErrors: {},
    };
  }
  const validErrors = errorData.data.errors.filter(
    (e): e is [string, string] => Array.isArray(e) && e.length === 2,
  );
  const fieldErrors = validErrors.reduce<Record<string, string>>(
    (acc, [field, message]) => {
      const normalizedField = field.toLowerCase();
      if (!acc[normalizedField]) {
        acc[normalizedField] = message;
      }
      return acc;
    },
    {},
  );
  const message = Object.values(fieldErrors).join(", ");
  return {
    message: message || "Validation failed",
    fieldErrors,
  };
};
