import Form from "../common/Form";
import styles from "../../styles/pages/LoginPage.module.scss";
import { useLoginForm } from "../../hooks/useLoginForm";
import { useNavigate, Link } from "react-router-dom";
import { loginFields } from "../../config/formFields";

const LoginForm = () => {
  const navigate = useNavigate();

  const onLoginSuccess = () => {
    void navigate("/");
  };

  const onLoginFailure = () => {
    // Handle failure
  };

  const { email, password, isLoading, handleChange, handleSubmit } =
    useLoginForm(onLoginSuccess, onLoginFailure);

  return (
    <div className={styles.loginContainer}>
      <Form
        fields={loginFields}
        formData={{ email, password }}
        onChange={handleChange}
        onSubmit={handleSubmit}
        submitButtonText={isLoading ? "Processing..." : "Login"}
        isLoading={isLoading}
        buttonClassName={styles.loginButton}
      />
      <div className={styles.registerLink}>
        <span>Don't have an account?</span>
        <Link to="/register">Register now</Link>
      </div>
    </div>
  );
};

export default LoginForm;
