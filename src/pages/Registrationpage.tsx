import { PageBanner, UspBanner } from "../components/common";
import RegisterForm from "../components/register/RegisterForm";

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
