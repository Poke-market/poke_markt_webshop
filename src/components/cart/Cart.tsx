import styles from "../../styles/components/cart/Cart.module.scss";
import { Button, Heading, Icons, Img, Input } from "../../utils";
import { Table } from "../common/Table.tsx";
import { createColumnHelper } from "@tanstack/react-table";
import { ChangeEvent, useMemo } from "react";
import { useAppSelector, useAppDispatch } from "../../store";
import {
  selectCartItems,
  selectCartItemCount,
  selectCartTotalPrice,
  updateQuantity,
  decrementQuantity,
  incrementQuantity,
  removeItem,
} from "../../store/cartSlice";

type props = {
  rowProduct: {
    name: string;
    image: string;
  };
  rowPrice: string;
  rowQuantity: {
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onMinus: () => void;
    onPlus: () => void;
  };
  rowSubtotal: string;
  rowDelete: () => void;
};

const CartPage = () => {
  const columnHelper = createColumnHelper<props>();
  const cartItems = useAppSelector(selectCartItems);
  const cartTotalPrice = useAppSelector(selectCartTotalPrice);
  const cartItemCount = useAppSelector(selectCartItemCount);
  const dispatch = useAppDispatch();

  const cartSubtotal = cartTotalPrice.toFixed(2);
  const isCartEmpty = cartItemCount === 0;

  const data: props[] = useMemo(() => {
    return cartItems.map(({ item, quantity }) => ({
      rowProduct: {
        name: item.name,
        image: item.photoUrl,
      },
      rowPrice: item.discount.discountedPrice.toFixed(2),
      rowQuantity: {
        value: quantity.toString(),
        onChange: (e: ChangeEvent<HTMLInputElement>) => {
          dispatch(
            updateQuantity({
              id: item._id,
              quantity: parseInt(e.target.value),
            }),
          );
        },
        onMinus: () => {
          dispatch(decrementQuantity(item._id));
        },
        onPlus: () => {
          dispatch(incrementQuantity(item._id));
        },
      },
      rowSubtotal: (item.discount.discountedPrice * quantity).toFixed(2),
      rowDelete: () => {
        dispatch(removeItem(item._id));
      },
    }));
  }, [cartItems, dispatch]);

  const columns = useMemo(
    () => [
      columnHelper.accessor("rowProduct", {
        cell: (info) => (
          <div className={styles["product-cell"]}>
            <div className={styles["image-container"]}>
              <Img src={info.getValue().image} alt="Product" />
            </div>
            <Heading>{info.getValue().name}</Heading>
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
            <button onClick={info.getValue().onMinus}>-</button>
            <Input
              type="number"
              value={info.getValue().value}
              onChange={info.getValue().onChange}
            />
            <button onClick={info.getValue().onPlus}>+</button>
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
      columnHelper.accessor("rowDelete", {
        id: "delete",
        cell: (info) => (
          <Button className={styles["delete-cell"]} onClick={info.getValue()}>
            <Icons.Delete />
          </Button>
        ),
        header: () => null,
      }),
    ],
    [columnHelper],
  );

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
            <Heading>€{isCartEmpty ? "0.00" : cartSubtotal}</Heading>
          </div>
          <div className={styles.total}>
            <Heading>Total</Heading>
            <Heading className={styles["total-amount"]}>
              €{isCartEmpty ? "0.00" : cartSubtotal}
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
