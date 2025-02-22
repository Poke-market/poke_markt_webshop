import { ImgProps } from "../types/types.ts";

const Img = ({
  src = "placeholder-image.png",
  alt = "Product Image",
  className = "",
  fallbackSrc = "",
  ...restProps
}: ImgProps) => {
  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>,
  ) => {
    e.currentTarget.src = fallbackSrc;
  };

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={handleImageError}
      {...restProps}
      loading="lazy"
    />
  );
};

export default Img;
