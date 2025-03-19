import { Form } from "../common/Form.tsx";
import { initialUserData } from "../../types/auth.ts";
import { registerFields } from "../../config/formFields.ts";
import { Heading } from "../common";
import { useRegisterForm } from "../../hooks/useRegisterForm.ts";
import styles from "../../styles/components/Register.module.scss";

const RegisterForm = () => {
  const {
    formData,
    statusMessage,
    toastResponse,
    isLoading,
    handleChange,
    handleSubmit,
  } = useRegisterForm(initialUserData);

  return (
    <div className={styles["register-form-container"]}>
      <Heading as="h2">Register New Account</Heading>
      <Form
        fields={registerFields}
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        statusMessage={statusMessage}
        isLoading={isLoading}
        submitButtonText="Register"
        toastResponse={toastResponse}
      />
    </div>
  );
};

export default RegisterForm;
