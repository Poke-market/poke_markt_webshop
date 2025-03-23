import Form from "../common/Form";
import styles from "../../styles/pages/LoginPage.module.scss";
import { useLoginForm } from "../../hooks/useLoginForm";
import { useNavigate, Link } from "react-router-dom";
import { loginFields } from "../../config/formFields";
import { Loading } from "../common";

interface LoginFormProps {
  onSuccess?: () => void;
  hideRegisterLink?: boolean;
}

const LoginForm = ({ onSuccess, hideRegisterLink = false }: LoginFormProps) => {
  const navigate = useNavigate();

  const {
    email,
    password,
    isLoading,
    statusMessage,
    handleChange,
    handleSubmit,
  } = useLoginForm(() => {
    if (onSuccess) {
      onSuccess();
    } else {
      void navigate("/");
    }
  });

  if (isLoading) return <Loading />;

  return (
    <div className={styles.loginContainer}>
      <h2>Login</h2>
      <Form
        fields={loginFields}
        formData={{ email, password }}
        onChange={handleChange}
        onSubmit={handleSubmit}
        submitButtonText={statusMessage || "Login"}
        isLoading={isLoading}
        buttonClassName={styles.loginButton}
      />
      {!hideRegisterLink && (
        <div className={styles.registerLink}>
          <span>Don&apos;t have an account? </span>
          <Link to="/register">Register now</Link>
        </div>
      )}
    </div>
  );
};

export default LoginForm;
