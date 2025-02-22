import { HeadingProps } from '../types/types.ts';
import { typographySizes } from '../utils/typographySizes.ts';

// I'm using Heading to be able to use it again in the Footer component
const Heading: React.FunctionComponent<HeadingProps> = ({
  children,
  className = 'text',
  size = 'textlg',
  as: Component = 'p',
  ...restProps
}) => {
  return (
    <Component
      className={`${typographySizes[size]} ${className}`}
      {...restProps}
    >
      {children}
    </Component>
  );
};

export default Heading;
