import Heading from "./Headingtxt.tsx";
import PokeImage from "../assets/poke.png";
import { ProductProps } from "../types/types.ts";

export default function ProductCard({
  discountText = "-30%",
  productName = "Product Name",
  description = "Product Description",
  currentPrice = "$100",
  originalPrice = "$150",
  className = "",
  ...Productprops
}: ProductProps) {
  return (
    <div className={className} {...Productprops}>
      <div>
        <img src={PokeImage} alt="Product Image" />
        <div>
          <Heading>{productName}</Heading>
          <p>{description}</p>
          <p>Current Price: {currentPrice}</p>
          <p>Original Price: {originalPrice}</p>
          <p>Discount: {discountText}</p>
        </div>
      </div>
    </div>
  );
}
