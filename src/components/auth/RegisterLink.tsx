import { Link } from "react-router-dom";
import styles from "../../styles/pages/LoginPage.module.scss";

interface RegisterLinkProps {
  hideRegisterLink?: boolean;
}

const RegisterLink = ({ hideRegisterLink }: RegisterLinkProps) => {
  if (hideRegisterLink) return null;

  return (
    <div className={styles.registerLink}>
      <span>Don&apos;t have an account? </span>
      <Link to="/register">Register now</Link>
    </div>
  );
};

export default RegisterLink;
