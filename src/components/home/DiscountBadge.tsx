import { Heading } from "../common";
import styles from "../../styles/components/home/ProductCard.module.scss";

// Define the props for the DiscountBadge component
type DiscountBadgeProps = {
  amount?: number; // Discount amount
  type?: string; // Discount type (e.g., "percentage" or "fixed")
};

// DiscountBadge component definition
const DiscountBadge = ({ amount, type }: DiscountBadgeProps) => {
  const discountText = type === "percentage" ? `- ${amount}%` : `- $${amount}`;

  return (
    <div className={styles.absoluteCenter}>
      <Heading className={styles.discountBadge}>{discountText}</Heading>
    </div>
  );
};

export default DiscountBadge;
