import { HeadingProps, sizes } from '../types/types.ts';

const Heading: React.FunctionComponent<HeadingProps> = ({
  children,
  className = 'text',
  size = 'textlg',
  as: Component = 'p',
  ...restProps
}) => {
  return (
    <Component className={`${sizes[size]} ${className}`} {...restProps}>
      {children}
    </Component>
  );
};

export default Heading;
