import { PageBanner, UspBanner } from "../components/common";
import LoginForm from "../components/login/loginForm.tsx";

const LoginPage = () => {
  return (
    <>
      <PageBanner title="Login" />
      <LoginForm />
      <UspBanner />
    </>
  );
};

export default LoginPage;
