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

export type FormField = {
  label: string;
  type:
    | "text"
    | "email"
    | "password"
    | "number"
    | "checkbox"
    | "select"
    | "textarea"
    | "tel";
  name: string;
  required?: boolean;
  options?: { value: string; label: string }[];
  render?: (props: {
    name: string;
    value: any;
    onChange: (e: ChangeEvent<any>) => void;
  }) => ReactNode;
  variant?: "underline" | "fill";
  shape?: "square" | "round";
  className?: string;
};

type FormProps<T extends Record<string, string | number | boolean>> = {
  fields: FormField[];
  formData: T;
  onChange: (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => void;
  onSubmit: (e: FormEvent) => void;
  statusMessage?: string;
  isLoading?: boolean;
  submitButtonText?: string;
  buttonClassName?: string;
  className?: string;
  toastResponse?: {
    key: keyof typeof import("../../config/toastResponses.ts").toastResponses;
    type: ToastResponseType;
  };
  errors?: Record<string, string>;
};

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
  useEffect(() => {
    if (toastResponse) {
      const response: ToastResponse = getToastResponse(toastResponse.key);
      const toastMethod =
        toastResponse.type === "success" ? toast.success : toast.error;
      toastMethod(response.message, { ...toastConfig, ...response.options });
    }
  }, [toastResponse]);

  return (
    <div className={`${styles["form-container"]} ${className}`.trim()}>
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
        {fields.map((field) => (
          <div
            className={`${styles["form-group"]} ${field.className ?? ""}`.trim()}
            key={field.name}
          >
            <label htmlFor={field.name}>{field.label}:</label>
            {field.render ? (
              field.render({
                name: field.name,
                value: formData[field.name as keyof T],
                onChange,
              })
            ) : field.type === "select" && field.options ? (
              <select
                id={field.name}
                name={field.name}
                value={(formData[field.name as keyof T] as string) || ""}
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
            ) : field.type === "textarea" ? (
              <textarea
                id={field.name}
                name={field.name}
                value={(formData[field.name as keyof T] as string) || ""}
                onChange={onChange}
                required={field.required}
              />
            ) : (
              <Input
                type={field.type}
                name={field.name}
                value={
                  field.type !== "checkbox"
                    ? (formData[field.name as keyof T] as string | number) || ""
                    : undefined
                }
                checked={
                  field.type === "checkbox"
                    ? (formData[field.name as keyof T] as boolean)
                    : undefined
                }
                onChange={
                  onChange as (e: ChangeEvent<HTMLInputElement>) => void
                }
                required={field.required}
              />
            )}
          </div>
        ))}

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
