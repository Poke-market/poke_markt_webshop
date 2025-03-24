import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearAuth } from "../../store/authSlice";
import { Button, Loading } from "../common";
import { getToastResponse, TOAST_KEYS, toastConfig } from "../../config";
import { RootState } from "../../store";
import { useState } from "react";
import { toast } from "react-toastify";
import styles from "../../styles/components/auth/Logout.module.scss";

interface LogoutProps {
  className?: string;
}

const Logout = ({ className }: LogoutProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );

  // This function is called when the user clicks the "Logout" button.
  const handleLogout = async () => {
    setIsLoggingOut(true);
    dispatch(clearAuth());
    localStorage.removeItem("token");

    // Simulate a 1.2-second delay to show the loading spinner.
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setIsLoggingOut(false);

    const { message, options } = getToastResponse(TOAST_KEYS.LOGOUT_SUCCESS);
    toast.success(message, { ...toastConfig, ...options });

    void navigate("/shop");
  };

  // This function is called when the user clicks the "Login" button.
  const handleLogin = () => {
    void navigate("/shop");
  };

  return (
    <>
      {isLoggingOut && (
        <div className={styles.loadingOverlay}>
          <Loading />
        </div>
      )}
      <div
        className={styles.container}
        style={{ "--opacity": isLoggingOut ? 0.5 : 1 } as React.CSSProperties}
      >
        <Button
          className={className}
          onClick={isAuthenticated ? handleLogout : handleLogin}
        >
          {isAuthenticated ? "Logout" : "Login"}
        </Button>
      </div>
    </>
  );
};

export default Logout;
