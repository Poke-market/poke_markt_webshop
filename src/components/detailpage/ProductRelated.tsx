import { Heading, Button } from "../common";
import styles from "../../styles/components/detailpage/RelatedProducts.module.scss";
import { ProductCard } from "../home";
<<<<<<< HEAD
import { useProduct } from "../../hooks/useProduct";

type RelatedProductProps = {
  slug?: string;
};

const RelatedProduct = ({ slug }: RelatedProductProps) => {
  const { availableProducts } = useProduct(slug);
=======
import { Item } from "../../types/apiTypes/item";

const RelatedProduct = () => {
  const dummy = {
    _id: "1",
    name: "Example Product",
    description: "This is an example product description",
    photoUrl: poke,
    price: 29.99,
    discount: {
      hasDiscount: true,
      amount: 10,
      type: "percentage",
      discountedPrice: 26.99,
    },
    slug: "example-product",
  } as Item;
>>>>>>> ba5678a448f4dac5e74d41bbc7e1553ece2f7f44

  return (
    <div className={styles.container}>
      <section className={styles.internalContainer} title="Related Products">
        <Heading as="h2" size="heading3xl">
          Related Products
        </Heading>
        <ul className={styles.relatedProducts}>
<<<<<<< HEAD
          {availableProducts.map((product) => (
            <li key={product._id}>
              <ProductCard
                id={product._id}
                name={product.name}
                description={product.description}
                image={product.photoUrl}
                price={product.price}
                currentPrice={`$${product.price.toFixed(2)}`}
                originalPrice={`$${(product.price * 1.2).toFixed(2)}`}
              />
            </li>
          ))}
=======
          <li>
            <ProductCard item={dummy} />
          </li>
          <li>
            <ProductCard item={dummy} />
          </li>
          <li>
            <ProductCard item={dummy} />
          </li>
          <li>
            <ProductCard item={dummy} />
          </li>
>>>>>>> ba5678a448f4dac5e74d41bbc7e1553ece2f7f44
        </ul>
        <Button className={styles.showBtn}>Show More</Button>
      </section>
    </div>
  );
};

export default RelatedProduct;
