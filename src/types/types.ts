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
  id: number;
  name: string;
  description: string;
  image: string;
  currentPrice: string;
  originalPrice: string;
  discountText?: string;
  className?: string;
  productName?: React.ReactNode;
  productDescription?: React.ReactNode;
  onClick?: () => void;
};

export type ButtonProps = {
  color?: string;
  size?: string;
  variant?: string;
  className?: string;
  children: React.ReactNode;
};
