import { ApiErrorData } from "../types/auth";

export const processErrorData = (errorData: ApiErrorData) => {
  if (!errorData.errors || !Array.isArray(errorData.errors)) {
    return {
      message: "An error occurred",
      fieldErrors: {},
    };
  }
  const validErrors = errorData.errors.filter(
    (e): e is [string, string] => Array.isArray(e) && e.length === 2,
  );
  const fieldErrors = validErrors.reduce<Record<string, string>>(
    (acc, [field, message]) => {
      const normalizedField = field.toLowerCase();
      acc[normalizedField] = acc[normalizedField]
        ? `${acc[normalizedField]}, ${message}`
        : message;
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
