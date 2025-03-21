import { Form } from "../common/Form.tsx";
import { initialUserData } from "../../types/auth.ts";
import { registerFields } from "../../config/formFields.ts";
import { Heading } from "../common";
import Loading from "../common/Loading";
import useRegisterForm from "../../hooks/useRegisterForm.ts";
import styles from "../../styles/components/Register.module.scss";
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
