import styles from "../scss/components/Cart.module.scss";
import { Button, Heading, Icons, Img, Input } from ".././utils";
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
          <div className={styles["product-cell"]}>
            {prolongation.length === 1 ? (
              <Heading>{info.getValue()}</Heading>
            ) : (
              <>
                <div className={styles["image-container"]}>
                  <Img src="https://picsum.photos/200/200" alt="Product" />
                </div>
                <Heading>{info.getValue()}</Heading>
              </>
            )}
          </div>
        ),
        header: () => (
          <div
            className={`${styles["header-cell"]} ${styles["product-header"]}`}
          >
            <Heading>Product</Heading>
          </div>
        ),
      }),
      columnHelper.accessor("rowPrice", {
        cell: (info) => (
          <div className={styles["price-cell"]}>
            <Heading>{info.getValue()}</Heading>
          </div>
        ),
        header: () => (
          <div className={`${styles["header-cell"]} ${styles["price-header"]}`}>
            <Heading>Price</Heading>
          </div>
        ),
      }),
      columnHelper.accessor("rowQuantity", {
        cell: (info) => (
          <div className={styles["quantity-cell"]}>
            <Input type="number" defaultValue={parseFloat(info.getValue())} />
          </div>
        ),
        header: () => (
          <div
            className={`${styles["header-cell"]} ${styles["quantity-header"]}`}
          >
            <Heading>Quantity</Heading>
          </div>
        ),
      }),
      columnHelper.accessor("rowSubtotal", {
        cell: (info) => (
          <div className={styles["subtotal-cell"]}>
            <Heading>{info.getValue()}</Heading>
          </div>
        ),
        header: () => (
          <div
            className={`${styles["header-cell"]} ${styles["subtotal-header"]}`}
          >
            <Heading>Subtotal</Heading>
          </div>
        ),
      }),
      columnHelper.display({
        id: "delete",
        cell: () =>
          prolongation.length === 0 && (
            <Button className={styles["delete-cell"]}>
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
      <div className={styles["table-container"]}>
        <Table
          columns={columns}
          data={data}
          className={styles["cart-table"]}
          theadProps={{ className: styles["cart-thead"] }}
          thProps={{ className: styles["cart-th"] }}
          tbodyProps={{ className: styles["cart-tbody"] }}
          trProps={{ className: styles["cart-tr"] }}
          tdProps={{ className: styles["cart-td"] }}
        />
      </div>
      <div className={styles["totals-container"]}>
        <div className={styles["totals-content"]}>
          <Heading as="h1" size="textmd">
            Cart Totals
          </Heading>
          <div className={styles.subtotal}>
            <Heading>Subtotal</Heading>
            <Heading>${isCartEmpty ? "0.00" : cartSubtotal}</Heading>
          </div>
          <div className={styles.total}>
            <Heading>Total</Heading>
            <Heading className={styles["total-amount"]}>
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
