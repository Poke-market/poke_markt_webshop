import { typographySizes } from "../utils/typographySizes.ts";

export type HeadFootProps = {
  // shared by Header and Footer
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  size?: keyof typeof typographySizes;
};

export type InputProps = React.ComponentProps<"input"> & {
  className?: string;
  variant?: "underline" | "fill";
  size?: "sm" | "md" | "xs";
  shape?: "square" | "round";
  color?: string;
};

export type ProductProps = {
  title: string;
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
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
  onClick?: () => void;
  disabled?: boolean;
};

export type ImgProps = {
  className?: string;
  src?: string;
  alt?: string;
  loading?: "lazy";
};
