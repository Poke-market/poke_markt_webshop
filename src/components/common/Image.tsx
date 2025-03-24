type Props = {
  className?: string;
  src?: string;
  alt?: string;
  loading?: "lazy";
};

// a reusable image component with customizable src, alt, and loading state
const Image = ({
  className = "",
  src = "",
  alt = "",
  loading = "lazy",
  ...restProps
}: Props) => {
  return (
    <img
      className={className}
      src={src}
      alt={alt}
      loading={loading}
      {...restProps}
    />
  );
};

export default Image;
