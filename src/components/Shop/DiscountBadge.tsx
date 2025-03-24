import { Heading } from "../common";
import styles from "../../styles/components/Shop/ProductCard.module.scss";

interface DiscountBadgeProps {
  amount?: number;
  type?: string;
}

export const DiscountBadge = ({ amount, type }: DiscountBadgeProps) => {
  const discountText = type === "percentage" ? `- ${amount}%` : `- $${amount}`;
  return (
    <div className={styles.absoluteCenter}>
      <Heading className={styles.discountBadge}>{discountText}</Heading>
    </div>
  );
};
