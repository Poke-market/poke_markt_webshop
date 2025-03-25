import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store";
import Logout from "../auth/Logout";
import Button from "../common/Button";
import LoginForm from "../auth/loginForm.tsx";
import { Icons } from "../../utils/Icons";
import styles from "../../styles/components/header/ProfileDropdown.module.scss";
import { selectIsAuthenticated, selectUser } from "../../store/authSlice.ts";

interface DropdownContentProps {
  onClose?: () => void;
}

const DropdownContent = ({ onClose }: DropdownContentProps) => {
  const navigate = useNavigate();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const user = useAppSelector(selectUser);

  const handleNavigate = (path: string) => () => {
    void navigate(path);
    if (onClose) onClose();
  };

  const defaultAvatar = "/public/default-avatar.png";

  return (
    <div className={styles.dropdownContainer}>
      {isAuthenticated ? (
        <>
          <div className={styles.profileHeader}>
            <div className={styles.avatarWrapper}>
              <div className={styles.avatarBackground} />
              <img
                src={user?.avatar ?? defaultAvatar}
                alt="Profile"
                className={styles.avatarImage}
              />
            </div>
            <div className={styles.userInfoContainer}>
              <div className={styles.nameContainer}>
                <span className={styles.userName}>
                  {user?.firstname ?? "User"}
                </span>
                {user && (
                  <div className={styles.proBadge}>
                    <span className={styles.proText}>PRO</span>
                  </div>
                )}
              </div>
              <span className={styles.userEmail}>
                {user?.email ?? "user@email.com"}
              </span>
            </div>
          </div>
          <div className={styles.menuItemsContainer}>
            <div
              className={styles.menuItem}
              onClick={handleNavigate("/profile")}
            >
              <div className={styles.menuIcon}>
                <Icons.Profile />
              </div>
              <span>Profile Settings</span>
            </div>
            <div
              className={styles.menuItem}
              onClick={handleNavigate("/orders")}
            >
              <div className={styles.menuIcon}>
                <Icons.ShoppingCart />
              </div>
              <span>My Orders</span>
            </div>
            <div
              className={styles.menuItem}
              onClick={handleNavigate("/contact")}
            >
              <div className={styles.menuIcon}>
                <Icons.Help />
              </div>
              <span>Help Center</span>
            </div>
          </div>
          <div className={styles.divider} />
          <div className={styles.buttonContainer}>
            <Logout className={styles.actionButton} />
          </div>
        </>
      ) : (
        <div className={styles.formWrapper}>
          <LoginForm onSuccess={onClose} />
        </div>
      )}
      <Button className={styles.closeButton} onClick={onClose}>
        close
      </Button>
    </div>
  );
};

export default DropdownContent;
