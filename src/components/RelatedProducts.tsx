import { Heading, Button } from "../utils";

const RelatedProduct = () => {
  return (
    <div>
      <div>
        <Heading as="h2" className="title">
          Related Products
        </Heading>
        <div>Products</div>
        <Button className="button">Show More</Button>
      </div>
    </div>
  );
};

export default RelatedProduct;
