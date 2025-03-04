import { Button, Heading } from "../utils";

const CartPage = () => (
  <section className="cart">
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div className="product">
                <img src="https://via.placeholder.com/150" alt="product" />
                <div className="product-info">
                  <Heading as="h3">Product Name</Heading>
                  <p>Product Description</p>
                </div>
              </div>
            </td>
            <td>$0.00</td>
            <td>
              <input type="number" value="1" readOnly />
            </td>
            <td>$0.00</td>
            <td>
              <Button>Delete</Button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div className="totals-container">
      <div className="totals-content">
        <Heading as="h1" size={"textmd"}>
          Cart Totals
        </Heading>
        <div className="subtotal">
          <Heading>Subtotal</Heading>
          <Heading>0.00</Heading>
        </div>
        <div className="total">
          <Heading>Total</Heading>
          <Heading className="total-amount">0.00</Heading>
        </div>
        <Button>Check Out</Button>
      </div>
    </div>
  </section>
);

export default CartPage;
