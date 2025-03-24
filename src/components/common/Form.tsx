import { ChangeEvent, FormEvent, ReactNode, useEffect } from "react";
import { Input, Button } from "./";
import styles from "../../styles/components/common/Form.module.scss";
import { toast } from "react-toastify";
import { toastConfig } from "../../config";
import {
  ToastResponse,
  ToastResponseType,
  getToastResponse,
} from "../../config/toastResponses.ts";

// Defines the structure of each form field
export type FormField = {
  label: string; // Display label for the field
  type: // Supported input types
  | "text"
    | "email"
    | "password"
    | "number"
    | "checkbox"
    | "select"
    | "textarea"
    | "tel";
  name: string; // Field identifier
  required?: boolean; // Whether the field is mandatory
  options?: { value: string; label: string }[]; // For select dropdowns
  render?: (props: {
    // Custom render function for flexibility
    name: string;
    value: any;
    onChange: (e: ChangeEvent<any>) => void;
  }) => ReactNode;
  variant?: "underline" | "fill"; // Styling variant for Input
  shape?: "square" | "round"; // Shape option for Input
  className?: string; // Custom styles for the field wrapper
};

// Props for the Form component with generic type for form data
type FormProps<T extends Record<string, string | number | boolean>> = {
  fields: FormField[]; // Array of form fields to render
  formData: T; // Current form values
  onChange: (e: ChangeEvent<any>) => void; // Handler for input changes
  onSubmit: (e: FormEvent) => void; // Handler for form submission
  statusMessage?: string; // Optional feedback message
  isLoading?: boolean; // Loading state for submission
  submitButtonText?: string; // Custom text for submit button
  buttonClassName?: string; // Styling for the submit button
  className?: string; // Styling for the form container
  toastResponse?: {
    // Optional toast notification config
    key: keyof typeof import("../../config/toastResponses.ts").toastResponses;
    type: ToastResponseType;
  };
  errors?: Record<string, string>; // Optional field-specific errors
};

/**
 * A flexible Form component that handles various input types and toast notifications
 */
export const Form = <T extends Record<string, string | number | boolean>>({
  fields,
  formData,
  onChange,
  onSubmit,
  statusMessage,
  isLoading = false,
  submitButtonText = "Submit",
  buttonClassName = "",
  className = "",
  toastResponse,
}: FormProps<T>) => {
  // Show toast notification when toastResponse changes
  useEffect(() => {
    if (toastResponse) {
      const response: ToastResponse = getToastResponse(toastResponse.key);
      const toastMethod =
        toastResponse.type === "success" ? toast.success : toast.error;
      toastMethod(response.message, { ...toastConfig, ...response.options });
    }
  }, [toastResponse]);

  // Helper to render the appropriate input based on field type
  const renderField = (field: FormField) => {
    const value = formData[field.name as keyof T];

    if (field.render) {
      return field.render({ name: field.name, value, onChange });
    }

    if (field.type === "select" && field.options) {
      return (
        <select
          id={field.name}
          name={field.name}
          value={(value as string) || ""}
          onChange={onChange}
          required={field.required}
        >
          <option value="">Select an option</option>
          {field.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      );
    }

    if (field.type === "textarea") {
      return (
        <textarea
          id={field.name}
          name={field.name}
          value={(value as string) || ""}
          onChange={onChange}
          required={field.required}
        />
      );
    }

    return (
      <Input
        type={field.type}
        name={field.name}
        value={
          field.type !== "checkbox"
            ? (value as string | number) || ""
            : undefined
        }
        checked={field.type === "checkbox" ? (value as boolean) : undefined}
        onChange={onChange as (e: ChangeEvent<HTMLInputElement>) => void}
        required={field.required}
        variant={field.variant}
        shape={field.shape}
      />
    );
  };

  return (
    <div className={`${styles["form-container"]} ${className}`.trim()}>
      {/* Display status message if provided */}
      {statusMessage && (
        <p
          className={
            statusMessage.includes("successful")
              ? styles["success-message"]
              : styles["error-message"]
          }
        >
          {statusMessage}
        </p>
      )}

      <form onSubmit={onSubmit}>
        {/* Rendering all form fields */}
        {fields.map((field) => (
          <div
            key={field.name}
            className={`${styles["form-group"]} ${field.className ?? ""}`.trim()}
          >
            <label htmlFor={field.name}>{field.label}:</label>
            {renderField(field)}
          </div>
        ))}

        {/* Submit button with loading state */}
        <Button
          type="submit"
          disabled={isLoading}
          className={buttonClassName}
          cursor={isLoading ? "not-allowed" : "pointer"}
        >
          {isLoading ? "Processing..." : submitButtonText}
        </Button>
      </form>
    </div>
  );
};

export default Form;
