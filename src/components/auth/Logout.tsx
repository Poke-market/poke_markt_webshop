import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearAuth } from "../../store/authSlice";
import { Button } from "../common";
import { RootState } from "../../store";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );

  const handleLogout = () => {
    dispatch(clearAuth());
    localStorage.removeItem("token");
    void navigate("/login");
  };

  const handleLogin = () => {
    void navigate("/login");
  };

  return (
    <Button onClick={isAuthenticated ? handleLogout : handleLogin}>
      {isAuthenticated ? "Logout" : "Login"}
    </Button>
  );
};

export default Logout;
