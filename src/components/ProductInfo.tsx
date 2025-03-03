import Heading from "../components/Headingtxt";
import styles from "../scss/components/ProductInfo.module.scss";
import { useState } from "react";
import { Icons } from "../utils/Icons";

interface ProductInfoProps {
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  id: string;
  category: string;
  tags: string[];
}

const ProductInfo = ({
  name,
  description,
  price,
  originalPrice,
  id,
  category,
  tags,
}: ProductInfoProps) => {
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  return (
    <div className={styles.productInfo}>
      <Heading as="h1" className={styles.productName}>
        {name}
      </Heading>
      <div className={styles.priceContainer}>
        <span className={styles.currentPrice}>${price}</span>
        {originalPrice && (
          <span className={styles.originalPrice}>${originalPrice}</span>
        )}
      </div>
      <p className={styles.description}>{description}</p>
      <div className={styles.actions}>
        <div className={styles.quantityContainer}>
          <button
            className={styles.quantityButton}
            onClick={handleDecrement}
            disabled={quantity <= 1}
          >
            -
          </button>
          <input
            type="number"
            value={quantity}
            onChange={(e) =>
              setQuantity(Math.max(1, parseInt(e.target.value) || 1))
            }
            min="1"
            className={styles.quantityInput}
          />
          <button className={styles.quantityButton} onClick={handleIncrement}>
            +
          </button>
        </div>
        <button className={styles.addToCart}>Add To Cart</button>
      </div>
      <div className={styles.productDetails}>
        <div className={styles.sku}>
          <span className={styles.label}>SKU</span>
          <span className={styles.value}>{id}</span>
        </div>
        <div className={styles.category}>
          <span className={styles.label}>Category</span>
          <span className={styles.value}>{category}</span>
        </div>
        <div className={styles.tags}>
          <span className={styles.label}>Tags</span>
          <div className={styles.tagList}>
            {tags.map((tag, index) => (
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
  );
};

export default ProductInfo;
