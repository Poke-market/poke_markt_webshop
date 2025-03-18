import Form from "../common/Form.tsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegisterForm = () => {
  return (
    <>
      <Form
        onSubmit={() => {}}
        submitText="Register"
        children={undefined}
        isLoading={false}
      ></Form>
      <ToastContainer />
    </>
  );
};

export default RegisterForm;
