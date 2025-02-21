import { typographySizes } from "../utils/typographySizes.ts";

export type HeadingProps = {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  size?: keyof typeof typographySizes;
};

export type HeaderProps = {
  className?: string;
};

export type InputProps = React.ComponentProps<"input"> & {
  className?: string;
  variant?: "underline" | "fill";
  size?: "sm" | "md" | "xs";
  shape?: "square" | "round";
  color?: string;
};

export type ProductProps = {
  className?: string;
  discountText?: string;
  productName?: React.ReactNode;
  description?: React.ReactNode;
  currentPrice?: React.ReactNode;
  originalPrice?: React.ReactNode;
};
