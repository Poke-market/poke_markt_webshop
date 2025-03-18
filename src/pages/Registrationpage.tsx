import { PageBanner, UspBanner } from "../components/common";
import RegisterForm from "../components/register/RegisterForm.tsx";

const RegisterPage = () => {
  return (
    <>
      <PageBanner title="Register" />
      <RegisterForm onRegisterSuccess={() => {}} onRegisterFailure={() => {}} />
      <UspBanner />
    </>
  );
};

export default RegisterPage;
