export const validateField = (
  name: string,
  value: string | boolean,
): string => {
  switch (name) {
    case "email": {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value as string)) {
        return "Invalid email format";
      }
      break;
    }
    case "password":
      if ((value as string).length < 8) {
        return "Password must be at least 6 characters";
      }

      if (!/[!@#$%^&*]/.test(value as string)) {
        return "Password must contain at least one special character";
      }

      if (!/\d/.test(value as string)) {
        return "Password must contain at least one number";
      }
      break;
    case "firstName":
      if ((value as string).trim().length === 0) {
        return "First name is required";
      }
      break;
    case "lastName":
      if ((value as string).trim().length === 0) {
        return "Last name is required";
      }
      break;
    case "agreeToTerms":
      if (!value) {
        return "You must agree to the terms";
      }
      break;
  }
  return "";
};
