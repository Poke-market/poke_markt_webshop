import Dropdown from "../common/Dropdown";
import DropdownContent from "./DropdownContent";
import styles from "../../styles/components/header/ProfileDropdown.module.scss";

interface ProfileDropdownProps {
  trigger: React.ReactNode;
}

const ProfileDropdown = ({ trigger }: ProfileDropdownProps) => {
  return (
    <Dropdown trigger={trigger} className={styles.profileDropdown}>
      <DropdownContent />
    </Dropdown>
  );
};

export default ProfileDropdown;
