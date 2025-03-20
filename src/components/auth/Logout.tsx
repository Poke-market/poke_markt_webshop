import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearAuth } from "../../store/authSlice.ts";
import Button from "../common/Button.tsx";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(clearAuth());
    localStorage.removeItem("token");
    void navigate("/login");
  };

  return <Button onClick={handleLogout}>Logout</Button>;
};

export default Logout;
