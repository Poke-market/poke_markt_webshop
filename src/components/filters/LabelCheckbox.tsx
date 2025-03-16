import { InputHTMLAttributes } from "react";
import styles from "../../scss/components/filters/LabelCheckbox.module.scss";
import { Icons } from "../../utils";

type LabelCheckboxProps = {
  label: string;
  subLabel?: string | number;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "type">;

const LabelCheckbox = ({
  label,
  subLabel,
  id = label,
  value = label,
  ...inputProps
}: LabelCheckboxProps) => {
  return (
    <div className={styles.labelCheckbox}>
      <input type="checkbox" id={id} value={value} {...inputProps} />
      <label htmlFor={id}>
        <span>{label}</span>
        <Icons.XFill className={styles.icon} height={16} />
      </label>
      {subLabel && <span>{subLabel}</span>}
    </div>
  );
};

export default LabelCheckbox;
