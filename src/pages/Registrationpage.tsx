import { PageBanner, UspBanner } from "../components/common";
import RegisterForm from "../components/auth/RegisterForm.tsx";

const RegisterPage = () => {
  return (
    <>
      <PageBanner title="Register" />
      <RegisterForm />
      <UspBanner />
    </>
  );
};

export default RegisterPage;
