import { forwardRef } from 'react';
import styles from '../scss/components/Input.module.scss';
import type { InputProps } from '../types/types';

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className = '',
      variant = 'fill',
      size = 'xs',
      shape = 'square',
      color = '',
      ...props
    },
    ref,
  ) => {
    const variantClass = styles[variant];
    const sizeClass = styles[size];
    const shapeClass = styles[shape];

    return (
      <input
        ref={ref}
        className={`${styles.input} ${variantClass} ${sizeClass} ${shapeClass} ${className}`}
        style={{ color }}
        {...props}
      />
    );
  },
);

export default Input;
