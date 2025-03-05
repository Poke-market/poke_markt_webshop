import styles from "../scss/components/Cart.module.scss";
import { Button, Heading, Icons, Img, Input } from "../utils";
import { Table } from "./Table";
import { createColumnHelper } from "@tanstack/react-table";
import { useMemo } from "react";

type CartItem = {
  rowProduct: string;
  rowPrice: string;
  rowQuantity: string;
  rowSubtotal: string;
};

const prolongation: CartItem[] = [];

const CartPage = () => {
  const columnHelper = createColumnHelper<CartItem>();

  const data = useMemo(() => {
    if (prolongation.length === 0) {
      return [
        {
          rowProduct: "Your Cart is empty",
          rowPrice: "0.00",
          rowQuantity: "0",
          rowSubtotal: "0.00",
        },
      ];
    }
    return prolongation;
  }, []);

  const columns = useMemo(
    () => [
      columnHelper.accessor("rowProduct", {
        cell: (info) => (
          <div className="product-cell">
            {prolongation.length === 0 ? (
              <Heading>{info.getValue()}</Heading>
            ) : (
              <>
                <div className="image-container">
                  <Img src="https://picsum.photos/200/200" alt="Product" />
                </div>
                <Heading>{info.getValue()}</Heading>
              </>
            )}
          </div>
        ),
        header: () => (
          <div className="header-cell product-header">
            <Heading>Product</Heading>
          </div>
        ),
      }),
      columnHelper.accessor("rowPrice", {
        cell: (info) => (
          <div className="price-cell">
            <Heading>{info.getValue()}</Heading>
          </div>
        ),
        header: () => (
          <div className="header-cell price-header">
            <Heading>Price</Heading>
          </div>
        ),
      }),
      columnHelper.accessor("rowQuantity", {
        cell: (info) => (
          <div className="quantity-cell">
            <Input type="number" defaultValue={info.getValue()} />
          </div>
        ),
        header: () => (
          <div className="header-cell quantity-header">
            <Heading>Quantity</Heading>
          </div>
        ),
      }),
      columnHelper.accessor("rowSubtotal", {
        cell: (info) => (
          <div className="subtotal-cell">
            <Heading>{info.getValue()}</Heading>
          </div>
        ),
        header: () => (
          <div className="header-cell subtotal-header">
            <Heading>Subtotal</Heading>
          </div>
        ),
      }),
      columnHelper.display({
        id: "delete",
        cell: () =>
          prolongation.length > 0 && (
            <Button className="delete-cell">
              <Icons.Delete />
            </Button>
          ),
        header: () => null,
      }),
    ],
    [columnHelper],
  );

  const isCartEmpty = prolongation.length === 0;

  const cartSubtotal = useMemo(() => {
    return prolongation
      .reduce((sum, item) => sum + parseFloat(item.rowSubtotal), 0)
      .toFixed(2);
  }, [prolongation]);

  return (
    <section className={styles.cart}>
      <div className="table-container">
        <Table
          columns={columns}
          data={data}
          className="cart-table"
          theadProps={{ className: "cart-thead" }}
          thProps={{ className: "cart-th" }}
          tbodyProps={{ className: "cart-tbody" }}
          trProps={{ className: "cart-tr" }}
          tdProps={{ className: "cart-td" }}
        />
      </div>
      <div className="totals-container">
        <div className="totals-content">
          <Heading as="h1" size="textmd">
            Cart Totals
          </Heading>
          <div className="subtotal">
            <Heading>Subtotal</Heading>
            <Heading>${isCartEmpty ? "0.00" : cartSubtotal}</Heading>
          </div>
          <div className="total">
            <Heading>Total</Heading>
            <Heading className="total-amount">
              ${isCartEmpty ? "0.00" : cartSubtotal}
            </Heading>
          </div>
          <Button
            disabled={isCartEmpty}
            cursor={isCartEmpty ? "not-allowed" : "pointer"}
          >
            Check Out
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CartPage;
