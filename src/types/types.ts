export const sizes = {
  textxs: 'text-xs',
  textmd: 'text-md',
  textlg: 'text-lg',
  textxl: 'text-xl',
  text2xl: 'text-2xl',
  text3xl: 'text-3xl',
  text5xl: 'text-5xl',
  headingxs: 'heading-xs',
  headings: 'heading-s',
  headingmd: 'heading-md',
  headinglg: 'heading-lg',
  headingxl: 'heading-xl',
  heading2xl: 'heading-2xl',
  heading3xl: 'heading-3xl',
  heading4xl: 'heading-4xl',
  heading5xl: 'heading-5xl',
};

export interface HeadingProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  size?: keyof typeof sizes;
}

export interface HeaderProps {
  className?: string;
}
