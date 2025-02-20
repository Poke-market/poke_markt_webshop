import { sizes } from '../utils/sizes.ts';

export interface HeadingProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  size?: keyof typeof sizes;
}

export interface HeaderProps {
  className?: string;
}

export type InputProps = React.ComponentProps<'input'> & {
  className?: string;
  variant?: 'underline' | 'fill';
  size?: 'sm' | 'md' | 'xs';
  shape?: 'square' | 'round';
  color?: string;
};
