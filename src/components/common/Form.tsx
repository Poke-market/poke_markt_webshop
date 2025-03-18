import React, { ReactNode } from "react";
import Button from "./Button.tsx";

type Props = {
  onSubmit: (e: React.FormEvent) => void;
  children: ReactNode;
  isLoading: boolean;
  submitText: string;
};

const Form = ({ onSubmit, children, isLoading, submitText }: Props) => {
  return (
    <form onSubmit={onSubmit}>
      {children}
      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Loading..." : submitText}
      </Button>
    </form>
  );
};

export default Form;
