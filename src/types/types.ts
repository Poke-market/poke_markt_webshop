import { typographySizes } from "../utils/typographySizes.ts";

export interface HeadingProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  size?: keyof typeof typographySizes;
}

export interface HeaderProps {
  className?: string;
}

export type InputProps = React.ComponentProps<"input"> & {
  className?: string;
  variant?: "underline" | "fill";
  size?: "sm" | "md" | "xs";
  shape?: "square" | "round";
  color?: string;
};

export interface ProductProps {
  className?: string;
  discountText?: string;
  productName?: React.ReactNode;
  description?: React.ReactNode;
  currentPrice?: React.ReactNode;
  originalPrice?: React.ReactNode;
}
