import { Heading, Loading, Form } from "../common";
import { initialUserData } from "../../types/auth";
import { registerFields } from "../../config/formFields";
import useRegisterForm from "../../hooks/useRegisterForm";
import styles from "../../styles/components/auth/Register.module.scss";
import "react-toastify/dist/ReactToastify.css";

const RegisterForm = () => {
  const { formData, isLoading, errors, handleChange, handleSubmit } =
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
        submitButtonText="Register"
        errors={errors}
      />
    </div>
  );
};

export default RegisterForm;
