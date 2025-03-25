import { ApiErrorData } from "../types/auth";

export const processErrorData = (errorData: ApiErrorData) => {
  console.log("errorData", errorData);
  if (!Array.isArray(errorData.errors)) {
    return {
      message: "An error occurred",
      fieldErrors: {},
    };
  }
  const singleError = Array.isArray(errorData.errors[0])
    ? null
    : errorData.errors[0];
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
  const message = [singleError, ...Object.values(fieldErrors)].join(", ");
  console.log("message", message);
  return {
    message: message || "Validation failed",
    fieldErrors,
  };
};
