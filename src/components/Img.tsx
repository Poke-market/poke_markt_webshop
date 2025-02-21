type ImgProps = React.DetailedHTMLProps<
  React.ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
> & {
  className?: string;
  src?: string;
  alt?: string;
};

const Img = ({
  className = "",
  src = "defaultNoData.png",
  alt = "testImg",
  ...restProps
}: React.PropsWithChildren<ImgProps>) => {
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
