type Props = {
  className?: string;
  src?: string;
  alt?: string;
  loading?: "lazy";
};

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
