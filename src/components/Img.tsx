import { ImgProps } from "../types/types.ts";

const Img = ({
  className = "",
  src = "defaultNoData.png",
  alt = "testImg",
  ...restProps
}: ImgProps) => {
  return (
    <img
      className={className}
      src={src}
      alt={alt}
      {...restProps}
      loading="lazy"
    />
  );
};

export default Img;
