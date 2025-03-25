import { Heading } from "../common";
import styles from "../../styles/components/home/OurProducts.module.scss";
import { ProductCard } from "../shop";
import { Link } from "react-router-dom";
import { useGetItemBySlugQuery } from "../../store/pokemartApi";
import { Item } from "../../types/apiTypes/item";
import LoadingSkeleton from "../common/LoadingSkeleton";

const FEATURED_PRODUCTS = [
  "moomoo-milk",
  "soda-pop",
  "thunder-stone",
  "tm144-shadow-ball",
  "zinc",
  "tm175-toxic",
  "charizardite-x",
  "metagrossite",
] as const;

const useFeaturedProducts = () => {
  const query1 = useGetItemBySlugQuery(FEATURED_PRODUCTS[0]);
  const query2 = useGetItemBySlugQuery(FEATURED_PRODUCTS[1]);
  const query3 = useGetItemBySlugQuery(FEATURED_PRODUCTS[2]);
  const query4 = useGetItemBySlugQuery(FEATURED_PRODUCTS[3]);
  const query5 = useGetItemBySlugQuery(FEATURED_PRODUCTS[4]);
  const query6 = useGetItemBySlugQuery(FEATURED_PRODUCTS[5]);
  const query7 = useGetItemBySlugQuery(FEATURED_PRODUCTS[6]);
  const query8 = useGetItemBySlugQuery(FEATURED_PRODUCTS[7]);

  const queries = [
    query1,
    query2,
    query3,
    query4,
    query5,
    query6,
    query7,
    query8,
  ];

  const products = queries
    .map((query) => query.data)
    .filter((product): product is Item => product !== undefined);

  const isLoading = queries.some((query) => query.isLoading);

  return { products, isLoading };
};

const OurProducts = () => {
  const { products, isLoading } = useFeaturedProducts();

  if (isLoading) {
    return (
      <div className={styles.container}>
        <section className={styles.internalContainer} title="Our Products">
          <Heading as="h2" size="heading3xl">
            Our Products
          </Heading>
          <LoadingSkeleton />
        </section>
      </div>
    );
  }

  if (!products.length) {
    return null;
  }

  return (
    <div className={styles.container}>
      <section className={styles.internalContainer} title="Our Products">
        <Heading as="h2" size="heading3xl">
          Our Products
        </Heading>
        <ul className={styles.productsGrid}>
          {products.map((product) => (
            <li key={product._id}>
              <ProductCard item={product} />
            </li>
          ))}
        </ul>
        <Link to="/shop" className={styles.showBtn}>
          Show More
        </Link>
      </section>
    </div>
  );
};

export default OurProducts;
