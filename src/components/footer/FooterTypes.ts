export type FooterLink = {
  path: string;
  label: string;
};

export type FooterLinksProps = {
  title: string;
  links: FooterLink[];
  className?: string;
};
