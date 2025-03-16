import { InputHTMLAttributes } from "react";
import styles from "../scss/components/PillCheckbox.module.scss";
import { Icons } from "../utils";

type PillCheckboxProps = {
  label: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "type">;

const PillCheckbox = ({
  label,
  id = label,
  value = label,
  ...inputProps
}: PillCheckboxProps) => {
  return (
    <div className={styles.pillCheckbox}>
      <input type="checkbox" id={id} value={value} {...inputProps} />
      <label htmlFor={id}>
        <span>{label}</span>
        <Icons.XFill className={styles.icon} />
      </label>
    </div>
  );
};

export default PillCheckbox;
