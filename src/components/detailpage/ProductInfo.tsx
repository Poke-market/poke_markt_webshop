import Heading from "../common/Headingtxt.tsx";
import styles from "../../styles/components/detailpage/ProductInfo.module.scss";
import { useState } from "react";
import { Icons } from "../../utils/Icons.tsx";
import ProductDisplay from "./ProductDisplay.tsx";
import { Product } from "../../types/types.ts";
import Button from "../common/Button.tsx";

type ProductInfoProps = {
  product: Product;
};

const ProductInfo = ({ product }: ProductInfoProps) => {
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const displayPrice =
    product.discount && product.discount.discountedPrice !== product.price
      ? product.discount.discountedPrice
      : product.price;

  const originalPrice =
    product.discount && product.discount.discountedPrice !== product.price
      ? product.price
      : undefined;

  return (
    <div className={styles.productDetail}>
      <ProductDisplay images={[product.photoUrl]} name={product.name} />
      <div className={styles.productInfo}>
        <Heading as="h1" size="textmd" className={styles.productName}>
          {product.name}
        </Heading>
        <div className={styles.priceContainer}>
          <span className={styles.currentPrice}>${displayPrice}</span>
          {originalPrice && (
            <span className={styles.originalPrice}>${originalPrice}</span>
          )}
        </div>

        <div className={styles.reviewContainer}>
          <div className={styles.stars}>
            <Icons.Star className={styles.star} />
            <Icons.Star className={styles.star} />
            <Icons.Star className={styles.star} />
            <Icons.Star className={styles.star} />
            <Icons.HalfStar className={styles.star} />
          </div>
          <div className={styles.pipe} />
          <Heading as="p" size="textxs" className={styles.reviewText}>
            5 Customer Review
          </Heading>
        </div>

        <p className={styles.description}>{product.description}</p>
        <div className={styles.actions}>
          <div className={styles.quantityContainer}>
            <Button
              className={styles.quantityButton}
              onClick={handleDecrement}
              disabled={quantity <= 1}
            >
              -
            </Button>
            <input
              type="number"
              value={quantity}
              onChange={(e) =>
                setQuantity(Math.max(1, parseInt(e.target.value) || 1))
              }
              min="1"
              className={styles.quantityInput}
            />
            <Button className={styles.quantityButton} onClick={handleIncrement}>
              +
            </Button>
          </div>
          <Button className={styles.addToCart}>Add To Cart</Button>
        </div>
        <div className={styles.productDetails}>
          <div className={styles.sku}>
            <span className={styles.label}>SKU</span>
            <span className={styles.value}>{product._id}</span>
          </div>
          <div className={styles.category}>
            <span className={styles.label}>Category</span>
            <span className={styles.value}>{product.category}</span>
          </div>
          <div className={styles.tags}>
            <span className={styles.label}>Tags</span>
            <div className={styles.tagList}>
              {product.tags.map((tag, index) => (
                <span key={index} className={styles.tag}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className={styles.share}>
            <span className={styles.label}>Share</span>
            <div className={styles.socialIcons}>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialIcon}
              >
                <Icons.Facebook />
              </a>
              <a
                href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialIcon}
              >
                <Icons.Linkedin />
              </a>
              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialIcon}
              >
                <Icons.XTwitter />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
