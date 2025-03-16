import { useState } from "react";
import styles from "../../styles/components/detailpage/ProductDisplay.module.scss";
import Button from "../common/Button.tsx";

interface ProductDisplayProps {
  images: string[];
  name: string;
}

const ProductDisplay = ({ images, name }: ProductDisplayProps) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className={styles.imageGallery}>
        <div className={styles.mainImage}>
          <img src="/placeholder-image.jpg" alt="No content available" />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.imageGallery}>
      <div className={styles.thumbnailSlider}>
        {images.map((image, index) => (
          <Button
            key={index}
            className={`${styles.thumbnail} ${
              index === selectedImageIndex ? styles.active : ""
            }`}
            onClick={() => setSelectedImageIndex(index)}
          >
            <img
              src={image}
              alt={`${name} ${index + 1}`}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "/placeholder-image.jpg";
              }}
            />
          </Button>
        ))}
      </div>
      <div className={styles.mainImage}>
        <img
          src={images[selectedImageIndex]}
          alt={name}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "/placeholder-image.jpg";
          }}
        />
      </div>
    </div>
  );
};

export default ProductDisplay;
