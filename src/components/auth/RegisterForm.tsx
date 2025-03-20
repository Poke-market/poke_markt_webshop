import { initialUserData } from "../../types/auth";
import { registerFields } from "../../config/formFields";
import { Heading, Loading, Form } from "../common";
import useRegisterForm from "../../hooks/useRegisterForm";
import styles from "../../styles/components/Register.module.scss";

const RegisterForm = () => {
  const { formData, statusMessage, isLoading, handleChange, handleSubmit } =
    useRegisterForm(initialUserData);

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
      />
    </div>
  );
};

export default RegisterForm;
