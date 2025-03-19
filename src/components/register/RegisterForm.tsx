import { Form } from "../common/Form.tsx";
import { initialUserData } from "../../types/auth.ts";
import { registerFields } from "../../config/formFields.ts";
import { Heading } from "../common";
import Loading from "../common/Loading"; // Import your Loading component
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

  if (isLoading) return <Loading />;

  return (
    <div className={styles["register-form-container"]}>
      <Heading as="h2">Register New Account</Heading>
      <Form
        fields={registerFields}
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        statusMessage={statusMessage}
        submitButtonText="Register"
        toastResponse={toastResponse}
      />
    </div>
  );
};

export default RegisterForm;
